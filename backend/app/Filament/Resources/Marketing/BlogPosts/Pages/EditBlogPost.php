<?php

namespace App\Filament\Resources\Marketing\BlogPosts\Pages;

use App\Filament\Resources\Marketing\BlogPosts\BlogPostResource;
use App\Models\Marketing\BlogPost;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditBlogPost extends EditRecord
{
    protected static string $resource = BlogPostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('preview')
                ->label('Preview on site')
                ->icon('heroicon-o-arrow-top-right-on-square')
                ->color('gray')
                ->url(fn (BlogPost $record): string => rtrim(
                    (string) config('app.marketing_site_url'),
                    '/'
                ) . '/blog/' . $record->slug)
                ->openUrlInNewTab(),
            DeleteAction::make(),
            RestoreAction::make(),
            ForceDeleteAction::make(),
        ];
    }
}
