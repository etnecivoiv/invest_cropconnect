<?php

namespace App\Http\Controllers\Admin;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Traits\Uploader;
use Inertia\Inertia;

class EventController extends Controller
{
    use Uploader;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="fa fa-plus"></i>&nbsp' . __('Add New'),
                'url' => route('admin.events.create'),
            ]
        ];

        $events = Event::withCount('users')->paginate();
        $totalEvents = Event::count();
        $totalActiveEvents = Event::where('is_active', 1)->count();
        $totalInActiveEvents = Event::where('is_active', 0)->count();

        return Inertia::render('Admin/Events/Index', [
            'buttons' => $buttons,
            'segments' => $segments,
            'events' => $events,
            'totalEvents' => $totalEvents,
            'totalActiveEvents' => $totalActiveEvents,
            'totalInActiveEvents' => $totalInActiveEvents,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back to list'),
                'url' => route('admin.events.index'),
            ]
        ];
        return Inertia::render('Admin/Events/Create', [
            'buttons' => $buttons,
            'segments' => $segments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $eventData = $request->validated();
        $eventData['preview'] = $this->uploadFile('preview', '');

        foreach ($eventData['guests'] as &$guest) {
            $guest['preview'] = $this->uploadFile($guest['preview'], '');
        }

        Event::create($eventData);
        return to_route('admin.events.index');
    }

    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {

        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back to list'),
                'url' => route('admin.events.index'),
            ]
        ];

        $event->guests = collect($event->guests)->map(function ($item) {
            $item['preview'] = null;
            return $item;
        });


        return Inertia::render('Admin/Events/Edit', [
            'eventData' => $event,
            'buttons' => $buttons,
            'segments' => $segments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $eventData = $request->validated();

        $eventData['preview'] = $this->uploadFile('preview', $event->preview);

        foreach ($eventData['guests'] as &$guest) {
            $guest['preview'] = $this->uploadFile($guest['preview'], '');
        }

        $event->update($eventData);
        return to_route('admin.events.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return back();
    }
}
