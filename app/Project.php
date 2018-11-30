<?php

namespace App;

use App\Scopes\EnabledScope;
use Illuminate\Database\Eloquent\Model;

/**
 * A portfolio item as the name implies, represents something that should show up on the main porfolio list. E.g A project,
 * or anything that you can tweak to conform to it's design.
 *
 * @package App
 */
class Project extends Model
{

    // override boot so we can install scopes and other stuff
    protected static function boot()
    {
        parent::boot();

        //Adding this makes queries conform to the EnabledScope, i.e Only enabled items are returned.
        static::addGlobalScope(new EnabledScope());
    }


    /**
     * Mass assignable properties
     *
     * @var array
     */
    protected $fillable = ['id', 'title', 'start', 'end', 'ongoing', 'description', 'actions', 'enabled', 'sort_order'];


    /**
     * The actions attribute when fetched should be decoded as a json object.
     * @param $value
     * @return mixed
     */
    public function getActionsAttribute($value){
        return json_decode($value);
    }

    /**
     * The actions attribute when set should be json-encoded.
     * @param $value
     */
    public function setActionsAttribute($value)
    {
        $this->attributes['actions'] = json_encode($value);
    }

    /**
     * Each {@link PortfolioItem} has a number of pages which show up on its right side on the portfolio page.
     * This is a one-many relationship, as each PorfolioItem can have zero to many pages.
     *
     * @see ProjectPage
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pages(){
        return $this->hasMany('App\ProjectPage');
    }

}
