<?php

namespace App;

use App\Scopes\EnabledScope;
use Illuminate\Database\Eloquent\Model;

/**
 * Represents a single page in a {@link PortfolioItem}. Each page has a list of different design options. See the
 * README.md file to figure out the different ways you can display each page.
 *
 * @package App
 */
class ProjectPage extends Model
{

    // override boot so we can install scopes and other stuff
    protected static function boot()
    {
        parent::boot();

        //Adding this makes queries conform to the EnabledScope, i.e Only enabled items are returned.
        static::addGlobalScope(new EnabledScope());
    }

    /**
     * Mass-assignable properties.
     * @var array
     */
    protected $fillable = [
        'background_color', 'foreground_color', 'description', 'content', 'style', 'thumbnail', 'content_type', 'device', 'project_id', 'enabled', 'sort_order'
    ];

}
