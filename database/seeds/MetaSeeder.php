<?php

use Illuminate\Database\Seeder;
use App\Meta;

class MetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data = json_decode(file_get_contents('database/seeds/meta.json'), true);
        $meta = new Meta($data);

        try{
            $meta->save();
        }catch (\Illuminate\Database\QueryException $e){

        }
    }
}
