<?php

use Illuminate\Database\Seeder;
use App\Project;
use App\ProjectPage;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $projects = json_decode(file_get_contents('database/seeds/projects.json'), true);
        foreach ($projects as $project){
            $item = new Project($project);
            $pages = (array)$item->pages;
            unset($item->pages);
            try {
                $item->save();
                if(count($pages) > 0){
                    foreach ($pages as $page_item){
                        $page = new ProjectPage($page_item);
                        $page->project_id = $item->id;
                        try{
                            $page->save();
                        }catch (\Illuminate\Database\QueryException $exception){}
                    }
                }
            }catch (\Illuminate\Database\QueryException $exception){}
        }

    }
}
