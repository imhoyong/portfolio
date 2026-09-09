import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Project } from '@/data/projects';

export const dynamic = 'force-static';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

function readData() {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to read projects.json:', error);
    return { profile: {}, categories: [], projects: [] };
  }
}

function writeData(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to write projects.json:', error);
    return false;
  }
}

// GET /api/projects
export async function GET() {
  const data = readData();
  return NextResponse.json(data.projects || []);
}

// POST /api/projects (Create new project)
export async function POST(request: Request) {
  try {
    const newProject: Project = await request.json();
    if (!newProject.title || !newProject.category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    const data = readData();
    const id = `proj-${Date.now()}`;
    const projectWithId = {
      ...newProject,
      id,
      tools: newProject.tools || [],
      features: newProject.features || [],
    };

    data.projects = [projectWithId, ...(data.projects || [])];
    const success = writeData(data);

    if (success) {
      return NextResponse.json(projectWithId, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// PUT /api/projects (Update existing project)
export async function PUT(request: Request) {
  try {
    const updatedProject: Project = await request.json();
    if (!updatedProject.id) {
      return NextResponse.json({ error: 'Project ID is required for update' }, { status: 400 });
    }

    const data = readData();
    const index = data.projects.findIndex((p: Project) => p.id === updatedProject.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    data.projects[index] = updatedProject;
    const success = writeData(data);

    if (success) {
      return NextResponse.json(data.projects[index]);
    } else {
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// DELETE /api/projects?id=proj-123
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Project ID parameter is required' }, { status: 400 });
  }

  const data = readData();
  const initialLength = data.projects.length;
  data.projects = data.projects.filter((p: Project) => p.id !== id);

  if (data.projects.length === initialLength) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const success = writeData(data);
  if (success) {
    return NextResponse.json({ message: 'Project deleted successfully' });
  } else {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
