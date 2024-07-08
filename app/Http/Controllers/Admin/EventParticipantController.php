<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Event $event)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back to list'),
                'url' => route('admin.events.index'),
            ]
        ];
        $participants = $event->users()->paginate();
        return Inertia::render('Admin/Events/Participants', [
            'event' => $event,
            'participants' => $participants,
            'segments' => $segments,
            'buttons' => $buttons,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event, $participant)
    {
        $event->users()->detach($participant);
        return back();
    }
}
