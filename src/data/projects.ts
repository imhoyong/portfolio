import initialData from './projects.json';

export interface Project {
  id: string;
  title: string;
  category: 'web-design' | 'web-dev' | 'dtp' | 'wordpress';
  categoryLabel: string;
  subtitle: string;
  description: string;
  longDescription: string;
  role: string;
  period: string;
  tools: string[];
  features: string[];
  thumbnail: string;
  demoUrl?: string;
  githubUrl?: string;
  pdfUrl?: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  behance?: string;
  blog?: string;
  yearsOfExperience: string;
}

export const CATEGORIES = initialData.categories as readonly { id: string; label: string }[];
export const PROFILE: ProfileInfo = initialData.profile;
export const PROJECTS: Project[] = initialData.projects as Project[];

export const SKILL_CATEGORIES = [
  {
    name: 'Webデザイン (UI/UX)',
    icon: 'Layout',
    description: 'ユーザー中心のUI/UXデザイン、レスポンシブなワイヤーフレームおよびデザインシステム構築',
    skills: ['Adobe XD', 'Photoshop', 'Illustrator', 'Design System', 'Responsive UI']
  },
  {
    name: 'Web開発 (Frontend)',
    icon: 'Code',
    description: 'Next.js, Reactをベースとしたフロントエンド実装およびモダンプラグイン活用',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3/JS']
  },
   {
    name: 'Web開発 (Backend)',
    icon: 'Code',
    description: 'PHP,ASP,MS-SQL,MYSQLを用いたサーバーサイド開発およびデータベース設計',
    skills: ['PHP', 'ASP', 'MySQL', 'MS-SQL', 'Database Design','laravel', 'Node.js', 'Express.js']
  },
  {
    name: 'DTP / 印刷編集デザイン',
    icon: 'BookOpen',
    description: 'パンフレット、カタログ、ポスター、印刷組版、CMYK校正および後加工プロセスの理解',
    skills: ['Adobe Illustrator', 'Editorial Layout', 'CMYK & Color Proofing', 'Typography', 'Print Supervision']
  },
  {
    name: 'WordPressテーマ開発',
    icon: 'Globe',
    description: 'WordPressオリジナルテーマ制作、PHPカスタムフィールド、Yootheme page builder',
    skills: ['WordPress PHP', 'ACF Pro', 'Yootheme page builder', 'WooCommerce', 'Theme Customization', 'SEO Optimization']
  }
];

export const CAREER_TIMELINE = [
  {
    period: '2022.03 - 現在',
    role: 'シニアWebデザイナー & フロントエンドエンジニア',
    company: '株式会社デジタルクリエイティブエージェンシー',
    description: 'WebサイトUI/UXデザイン、Next.js / Vue.jsフロントエンド開発、企業向けWordPressテーマ制作およびブランディングDTP制作を統括。'
  },
  {
    period: '2020.01 - 2022.02',
    role: 'DTPエディトリアルデザイナー & Webアシスタント',
    company: '株式会社デザインプリント',
    description: '企業パンフレット・カタログの印刷編集デザイン、InDesignマスターレイアウト作成、WebイベントLPデザイン。'
  }
];
