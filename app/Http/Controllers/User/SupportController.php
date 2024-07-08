<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Support;
use App\Models\Supportlog;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PageHeader;
use Auth;
class SupportController extends Controller
{
    public function index(Request $request)
    {

        PageHeader::set()
            ->title("Support Tickets")
            ->buttons([
                [
                    'name' => __('Create Support Ticket'),
                    'url' => route('user.supports.create'),
                ]
            ]);

        $supports = Support::query()->where('user_id',Auth::id());
        if (!empty($request->search)) {
            if ($request->type == 'email') {
                $supports = $supports->whereHas('user', function ($q) use ($request) {
                    return $q->where('email', $request->search);
                });
            } else {
                $supports = $supports->where($request->type, 'LIKE', '%' . $request->search . '%');
            }
        }
        $supports = $supports->with('user')->withCount('conversations')->latest()->paginate(20);

        $pendingSupport = Support::where('status', 2)->count();
        $openSupport = Support::where('status', 1)->count();
        $closedSupport = Support::where('status', 0)->count();
        $totalSupports = $pendingSupport + $openSupport + $closedSupport;

        $type = $request->type ?? 'email';
        return Inertia::render('User/Support/Index', [
            'request' => $request,
            'supports' => $supports,
            'pendingSupport' => $pendingSupport,
            'openSupport' => $openSupport,
            'closedSupport' => $closedSupport,
            'totalSupports' => $totalSupports,
            'type' => $type,
        ]);
    }

    public function create()
    {
        PageHeader::set()
        ->title("Create Ticket")
        ->buttons([
            [
                'name' => __('Back'),
                'url' => route('user.supports.index'),
            ]
        ]);
        return Inertia::render('User/Support/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|max:100|min:10',
            'message' => 'required|max:1000',
        ]);

        $support = new Support;
        $support->user_id = auth()->id();
        $support->subject = $request->subject;
        $support->save();

        $support->conversations()->create([
            'comment'  => $request->message,
            'is_admin' => 0,
            'user_id'  => auth()->id()
        ]);

        Notification::create([
            'user_id' => auth()->id(),
            'title' => 'New Support ticket ('. $support->ticket_no .')',
            'is_admin' => 1,
            'url' => url('/admin/support/'.$support->id),
            'comment' => Auth::user()->name .' Has Created New Support Ticket',
        ]);

        return to_route('user.supports.index');
    }

    public function show(string $id)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back'),
                'url' => route('admin.support.index'),
            ]
        ];
        $support = Support::with('conversations.user', 'user')->findOrFail($id);
        Supportlog::where('is_admin', 0)->where('support_id', $id)->update([
            'seen' => 1
        ]);

        return Inertia::render('User/Support/Show', [
            'support' => $support,
            'segments' => $segments,
            'buttons' => $buttons,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'message' => 'required|max:1000',
        ]);

        $support = Support::where('user_id', auth()->id())->where('status', 1)->findOrFail($id);

        $support->conversations()->create([
            'comment'  => $request->message,
            'is_admin' => 0,
            'seen' => 0,
            'user_id'  => auth()->id()
        ]);

        Notification::create([
            'user_id' => auth()->id(),
            'title' => 'Support ticket replied ('. $support->ticket_no .')',
            'is_admin' => 1,
            'url' => url('/admin/support/'.$support->id),
            'comment' => Auth::user()->name .' Has Replied To The Support Ticket',
        ]);

        return back();
    }
}
