@extends('layouts.app')
@section('content')
<h2 class="mt-4">Country List</h2>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="breadcrumb-item active">Country</li>
</ol>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Country List
    </div>
    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach ($datas as $data)
                <tr>
                    <td>{{ $data->name }}</td>
                    <td>
                        <form action="{{ route('country.toggleStatus', $data->id) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('PATCH')

                            @if ($data->is_active)
                                <button type="submit" class="btn btn-danger btn-sm">Deactivate</button>
                            @else
                                <button type="submit" class="btn btn-success btn-sm">Activate</button>
                            @endif
                        </form>
                    </td>
                    <td>
                        <a href="{{ route('country.edit', $data->id) }}" class="btn btn-warning btn-sm">Edit</a>

                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection

