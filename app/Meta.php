<?php

namespace App;

use App\Scopes\EnabledScope;
use Illuminate\Database\Eloquent\Model;

/**
 * Represents meta-data for portfolio page
 * e.g Title, Description, etc
 *
 * Class Meta
 * @package App
 */
class Meta extends Model
{

    // override boot so we can install scopes and other stuff
    protected static function boot()
    {
        parent::boot();

        //Adding this makes queries conform to the EnabledScope, i.e Only enabled items are returned.
        static::addGlobalScope(new EnabledScope());
    }


    /**
     * Mass-assignable attrs
     * @var array
     */
    protected $fillable = ["portfolio_title", "portfolio_subtitle", "portfolio_description", 'portfolio_footer'];

}
