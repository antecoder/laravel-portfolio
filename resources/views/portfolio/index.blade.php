<!doctype html>
<html lang=en>

@php
    $meta = \App\Meta::query()->first();
@endphp

@include('includes.head', [
    'title' => 'Portfolio', 'css' => 'css/portfolio.css'
])
<div class=page-content>
    <header><h1>{{$meta && $meta->portfolio_title ? $meta->portfolio_title : ""}}</h1>
        <div class=subtitle><p>{{$meta && $meta->portfolio_subtitle ? $meta->portfolio_subtitle : ""}}</p></div>
        <div class=intro><p>{!! $meta && $meta->portfolio_description ? $meta->portfolio_description : "" !!}</p>
        </div>
    </header>
    <main>
        @php
            $projects = \App\Project::query()->orderBy('sort_order', 'desc')->get();
        @endphp

        @if(count($projects))
            @foreach($projects as $project)
                <section class=project>
                    <div class=info><h2>{{$project->title}}</h2>
                        <p class=date>{{\Carbon\Carbon::parse($project->start)->format('F Y')}}@if($project->ongoing) - Present @elseif(!empty($project->end)) - {{\Carbon\Carbon::parse($project->end)->format('F Y')}}@endif</p>
                        {!!$project->description!!}
                        @if(!empty($project->actions))
                            <div class=actions>
                                @php
                                    $actions = (array) $project->actions;
                                @endphp
                                @foreach($actions as $key => $value)
                                    <a href={{$value}} target="_blank">{{$key}}</a>
                                @endforeach
                            </div>
                        @endif
                    </div>
                    @php
                        $pages = $project->pages()->get();
                    @endphp
                    @if(count($pages))
                        <div class=pages>
                            @foreach($pages as $page)
                                <div class="page {{$page->content_type}}" style="background-color: {{$page->background_color}}">
                                    <div tabindex=0 class="media loader-parent" style=color:{{$page->foreground_color}}>
                                        <div @if(!empty($page->style)) style="{{$page->style}}" @endif @if(!empty($page->device))class="device-frame {{$page->device}}" @endif>
                                            @if(!empty($page->content))
                                                @if(strpos($page->content_type, "video") !== false)
                                                    <video loop preload=none>
                                                        <source src={{$page->content}} type=video/mp4>
                                                    </video>
                                                @endif
                                            @endif
                                            <img class=thumb src={{$page->thumbnail}}></div>
                                        <svg class=loading-spinner width=64 height=64 viewbox="0 0 64 64">
                                            <circle cx=32 cy=32 r=20 fill=none stroke-width=6 stroke-miterlimit=10 stroke=#ccc></circle>
                                        </svg>
                                    </div>
                                    @if(!empty($page->description))
                                        <div class=caption><p>{!! $page->description !!}</p></div>
                                    @endif
                                </div>
                            @endforeach
                        </div>
                    @endif
                </section>
            @endforeach
        @endif
    </main>
    @if($meta && $meta->portfolio_footer)
        <footer><p>{!! $meta->portfolio_footer !!}</p></footer>
    @endif
</div>
<script src={{"js/lib/jquery/dist/jquery.min.js"}}></script>
<script src={{"js/lib/fastclick/lib/fastclick.js"}}></script>
<script src={{"js/lib/hammerjs/hammer.min.js"}}></script>
<script src={{"js/portfolio.js"}}></script>
<script>
</script>
</body>
</html>