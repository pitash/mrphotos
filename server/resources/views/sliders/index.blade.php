@extends('layouts.app')

@section('content')
<h2 class="mt-4">Slider List</h2>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="breadcrumb-item active">Slider</li>
</ol>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Slider List
    </div>
    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Heading</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Tag</th>
                    <th>Heading</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach ($sliders as $slider)
                <tr>
                    <td>{{ $slider->tag }}</td>
                    <td>{{ $slider->heading }}</td>
                    <td>
                        @if ($slider->image_path)
                            <img src="{{ asset('storage/' . $slider->image_path) }}" alt="Slider Image" width="100">
                        @else
                            No Image
                        @endif
                    </td>
                    <td>
                        @if ($slider->is_active)
                            <span class="badge bg-success">Active</span>
                        @else
                            <span class="badge bg-danger">Inactive</span>
                        @endif
                    </td>
                    <td>
                        <a href="#" class="btn btn-warning btn-sm">Edit</a>
                        {{-- <a href="{{ route('sliders.edit', $slider->id) }}" class="btn btn-warning btn-sm">Edit</a> --}}

                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection

