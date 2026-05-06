<?php

namespace App\Filament\Resources\Marketing\BlogPosts\Schemas;

use App\Models\Marketing\BlogPost;
use App\Models\User;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Set;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogPostForm
{
    public const CATEGORIES = [
        'Case Study' => 'Case Study',
        'Marketing Tips' => 'Marketing Tips',
        'Product Update' => 'Product Update',
        'CRM Analysis' => 'CRM Analysis',
        'Other' => 'Other',
    ];

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Info')
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(180)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (?string $state, Set $set, ?BlogPost $record): void {
                                if ($record !== null) {
                                    return; // do not regenerate slug on edit
                                }
                                $set('slug', $state ? Str::slug($state) : null);
                            }),
                        TextInput::make('slug')
                            ->required()
                            ->alphaDash()
                            ->maxLength(180)
                            ->unique(BlogPost::class, 'slug', ignoreRecord: true),
                        Textarea::make('excerpt')
                            ->maxLength(500)
                            ->rows(3)
                            ->columnSpanFull(),
                        FileUpload::make('cover_image')
                            ->image()
                            ->imageEditor()
                            ->directory('blog/covers'),
                        Select::make('author_id')
                            ->label('Author (staff user)')
                            ->relationship('author', 'name')
                            ->searchable()
                            ->preload()
                            ->placeholder('— use byline below instead —'),
                        TextInput::make('author_name')
                            ->label('Author byline (fallback)')
                            ->helperText('Used when no staff author is selected (e.g. "Alliances PRO Team")')
                            ->maxLength(120),
                        Select::make('category')
                            ->options(self::CATEGORIES)
                            ->required()
                            ->native(false)
                            ->searchable(),
                        TagsInput::make('tags')
                            ->placeholder('Add a tag…')
                            ->columnSpanFull(),
                        Select::make('status')
                            ->options(BlogPost::STATUSES)
                            ->required()
                            ->native(false)
                            ->default(BlogPost::STATUS_DRAFT),
                        DateTimePicker::make('published_at')
                            ->seconds(false),
                    ]),

                Section::make('Content')
                    ->collapsible()
                    ->schema([
                        MarkdownEditor::make('body')
                            ->label('Markdown body')
                            ->helperText('Primary post content. Rendered by the public site as Markdown (GFM).')
                            ->columnSpanFull(),
                        Builder::make('content_blocks')
                            ->label('Block content (optional, opt-in)')
                            ->helperText('When populated, the public site will render these blocks instead of the markdown body. Leave empty to keep markdown.')
                            ->collapsible()
                            ->collapsed()
                            ->blocks(self::contentBlocks())
                            ->columnSpanFull(),
                    ]),

                Section::make('SEO')
                    ->collapsible()
                    ->collapsed()
                    ->columns(2)
                    ->schema([
                        TextInput::make('seo_title')
                            ->label('Meta title')
                            ->maxLength(60)
                            ->helperText('60 characters max — appears in search results and tab titles.'),
                        TextInput::make('focus_keyword')
                            ->maxLength(120),
                        Textarea::make('seo_description')
                            ->label('Meta description')
                            ->maxLength(160)
                            ->rows(3)
                            ->helperText('160 characters max.')
                            ->columnSpanFull(),
                        FileUpload::make('og_image')
                            ->image()
                            ->imageEditor()
                            ->directory('blog/og')
                            ->helperText('Falls back to cover image when blank.'),
                        Toggle::make('allow_indexing')
                            ->label('Allow search engines to index')
                            ->default(true)
                            ->inline(false),
                    ]),

                Section::make('Settings')
                    ->collapsible()
                    ->collapsed()
                    ->columns(2)
                    ->schema([
                        Select::make('visibility')
                            ->options(BlogPost::VISIBILITIES)
                            ->required()
                            ->native(false)
                            ->default(BlogPost::VISIBILITY_PUBLIC),
                        TextInput::make('reading_minutes')
                            ->numeric()
                            ->minValue(0)
                            ->helperText('Auto-calculated from word count on save. Override here if you need to.'),
                        Toggle::make('is_published')
                            ->label('Published')
                            ->helperText('Legacy flag — kept in sync with Status. Toggle Status above to change visibility.')
                            ->inline(false),
                        Toggle::make('is_featured')
                            ->label('Featured on /blog')
                            ->helperText('Only one post should be featured at a time.')
                            ->inline(false),
                        Toggle::make('is_pinned')
                            ->label('Pinned to top of list')
                            ->inline(false),
                        Toggle::make('allow_comments')
                            ->default(true)
                            ->inline(false),
                        Toggle::make('show_toc')
                            ->label('Show table of contents')
                            ->default(true)
                            ->inline(false),
                    ]),
            ]);
    }

    /**
     * @return array<int, Block>
     */
    public static function contentBlocks(): array
    {
        return [
            Block::make('heading')
                ->label('Heading')
                ->icon('heroicon-o-bars-3-bottom-left')
                ->schema([
                    TextInput::make('text')->required(),
                    Select::make('level')
                        ->options(['h2' => 'H2', 'h3' => 'H3', 'h4' => 'H4'])
                        ->default('h2')
                        ->required(),
                ]),

            Block::make('paragraph')
                ->label('Paragraph')
                ->icon('heroicon-o-bars-3')
                ->schema([
                    RichEditor::make('content')
                        ->required()
                        ->toolbarButtons(['bold', 'italic', 'link', 'orderedList', 'bulletList', 'blockquote', 'codeBlock', 'h2', 'h3'])
                        ->columnSpanFull(),
                ]),

            Block::make('image')
                ->label('Image')
                ->icon('heroicon-o-photo')
                ->schema([
                    FileUpload::make('file')->image()->imageEditor()->directory('blog/blocks/images')->required(),
                    TextInput::make('alt')->label('Alt text')->required()->maxLength(180),
                    TextInput::make('caption')->maxLength(180),
                ]),

            Block::make('gallery')
                ->label('Gallery')
                ->icon('heroicon-o-rectangle-stack')
                ->schema([
                    FileUpload::make('files')
                        ->image()
                        ->multiple()
                        ->reorderable()
                        ->directory('blog/blocks/galleries')
                        ->required(),
                    TextInput::make('caption')->maxLength(180),
                ]),

            Block::make('video')
                ->label('Video (URL)')
                ->icon('heroicon-o-play-circle')
                ->schema([
                    TextInput::make('url')->url()->required()->helperText('YouTube / Vimeo / direct MP4 URL'),
                    TextInput::make('caption')->maxLength(180),
                ]),

            Block::make('code')
                ->label('Code block')
                ->icon('heroicon-o-code-bracket')
                ->schema([
                    Select::make('language')
                        ->options([
                            'plaintext' => 'Plain text',
                            'bash' => 'Bash',
                            'javascript' => 'JavaScript',
                            'typescript' => 'TypeScript',
                            'php' => 'PHP',
                            'python' => 'Python',
                            'json' => 'JSON',
                            'yaml' => 'YAML',
                            'sql' => 'SQL',
                            'html' => 'HTML',
                            'css' => 'CSS',
                        ])
                        ->default('plaintext'),
                    Textarea::make('code')->required()->rows(8)->columnSpanFull(),
                ]),

            Block::make('quote')
                ->label('Quote')
                ->icon('heroicon-o-chat-bubble-left-right')
                ->schema([
                    Textarea::make('text')->required()->rows(3),
                    TextInput::make('author')->maxLength(120),
                ]),

            Block::make('tweetable_quote')
                ->label('Tweetable Quote')
                ->icon('heroicon-o-megaphone')
                ->schema([
                    Textarea::make('text')->required()->rows(3)->maxLength(240)
                        ->helperText('Renders with a "Click to tweet" CTA on the public site.'),
                ]),

            Block::make('callout')
                ->label('Callout')
                ->icon('heroicon-o-light-bulb')
                ->schema([
                    Select::make('type')
                        ->options(['info' => 'Info', 'warning' => 'Warning', 'success' => 'Success', 'error' => 'Error'])
                        ->default('info')
                        ->required(),
                    Textarea::make('content')->required()->rows(3),
                ]),

            Block::make('cta')
                ->label('Call to action')
                ->icon('heroicon-o-arrow-right-circle')
                ->schema([
                    TextInput::make('heading')->required()->maxLength(120),
                    Textarea::make('description')->rows(2),
                    TextInput::make('button_text')->required()->maxLength(60),
                    TextInput::make('button_url')->url()->required(),
                    Select::make('style')
                        ->options(['primary' => 'Primary', 'secondary' => 'Secondary', 'ghost' => 'Ghost'])
                        ->default('primary'),
                ]),

            Block::make('accordion')
                ->label('Accordion')
                ->icon('heroicon-o-queue-list')
                ->schema([
                    Repeater::make('items')
                        ->schema([
                            TextInput::make('title')->required()->maxLength(180),
                            Textarea::make('content')->required()->rows(3),
                        ])
                        ->reorderable()
                        ->minItems(1)
                        ->columnSpanFull(),
                ]),

            Block::make('tabs')
                ->label('Tabs')
                ->icon('heroicon-o-rectangle-group')
                ->schema([
                    Repeater::make('items')
                        ->schema([
                            TextInput::make('label')->required()->maxLength(60),
                            Textarea::make('content')->required()->rows(3),
                        ])
                        ->reorderable()
                        ->minItems(2)
                        ->columnSpanFull(),
                ]),

            Block::make('newsletter')
                ->label('Newsletter signup')
                ->icon('heroicon-o-envelope')
                ->schema([
                    TextInput::make('heading')->required()->maxLength(120),
                    Textarea::make('description')->rows(2),
                    TextInput::make('button_text')->default('Subscribe')->maxLength(60),
                ]),

            Block::make('lead_magnet')
                ->label('Lead magnet')
                ->icon('heroicon-o-gift')
                ->schema([
                    TextInput::make('title')->required()->maxLength(120),
                    Textarea::make('description')->rows(2),
                    FileUpload::make('file')->directory('blog/lead-magnets')->required(),
                ]),

            Block::make('divider')
                ->label('Divider')
                ->icon('heroicon-o-minus')
                ->schema([]),

            Block::make('table')
                ->label('Table')
                ->icon('heroicon-o-table-cells')
                ->schema([
                    TextInput::make('caption')->maxLength(180),
                    Repeater::make('rows')
                        ->schema([
                            Repeater::make('cells')
                                ->simple(TextInput::make('value')->required())
                                ->minItems(1)
                                ->reorderable(),
                        ])
                        ->minItems(1)
                        ->reorderable()
                        ->columnSpanFull(),
                ]),
        ];
    }
}
