@extends('layouts.app')

@section('content')
<h2 class="mt-4">Gallery List</h2>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="breadcrumb-item active">Gallery</li>
</ol>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Gallery List
    </div>
    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach ($datas as $data)
                <tr>
                    <td>{{ $data->title }}</td>
                    <td>{{ $data->description }}</td>
                    <td>
                        @if ($data->image_path)
                            <img src="{{ asset('storage/' . $data->image_path) }}" alt="Gallery Image" height="100" width="200">
                        @else
                            No Image
                        @endif
                    </td>
                    <td>{{ $data->country->name }}</td>
                    <td>
                        <form action="{{ route('gallery.toggleStatus', $data->id) }}" method="POST" style="display: inline;">
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
                        <a href="#" class="btn btn-warning btn-sm">Edit</a>
                        {{-- <a href="{{ route('data.edit', $slider->id) }}" class="btn btn-warning btn-sm">Edit</a> --}}

                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection

