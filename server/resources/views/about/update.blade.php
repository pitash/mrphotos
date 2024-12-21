@extends('layouts.app')

@section('content')
<div class="container my-2">
    <h2 class="mb-4">About</h2>
    <hr>
    @if (session('success'))
        <div id="successAlert" class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <form id="editForm" action="{{ route('about.update') }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PATCH')

        <div class="row mb-3">
            <div class="col-md-2">
                <label for="name" class="form-label fw-bold">Name</label>
                <input type="text" class="form-control" id="name" name="name" value="{{ $data->name }}" required>
            </div>
            <div class="col-md-2">
                <label for="image" class="form-label fw-bold">Image</label>
                <input type="file" class="form-control" id="image" name="image" accept="image/*">
                @if ($data->image_path)
                    <img src="{{ asset('storage/' . $data->image_path) }}" alt="Current Image" class="mt-2" width="200" style="object-fit: cover;">
                @endif
            </div>
            <div class="col-md-8">
                <label for="description" class="form-label fw-bold">Description</label>
                <textarea class="form-control" id="description" name="description" rows="7" required>{{ $data->description }}</textarea>
            </div>
        </div>

        <div class="row">
            @for ($i = 1; $i <= 3; $i++)
                <div class="col-md-4 mb-3">
                    <label for="quot{{ $i }}_title" class="form-label fw-bold">Quotation {{ $i }} Title</label>
                    <input type="text" class="form-control" id="quot{{ $i }}_title" name="quot{{ $i }}_title" value="{{ $data->{'quot'.$i.'_title'} }}" required>

                    <label for="quot{{ $i }}_desc" class="form-label fw-bold">Quotation {{ $i }} Description</label>
                    <textarea class="form-control" id="quot{{ $i }}_desc" name="quot{{ $i }}_desc" rows="7" required>{{ $data->{'quot'.$i.'_desc'} }}</textarea>
                </div>
            @endfor
        </div>

        <button type="submit" class="btn btn-success mt-4" id="editBtn">Update About</button>
    </form>
</div>

<script>
    document.getElementById('editForm').addEventListener('submit', function(event) {
        const editBtn = document.getElementById('editBtn');
        editBtn.disabled = true;
        editBtn.textContent = "Updating...";
    });
</script>
@endsection

