@extends('layouts.app')

@section('content')
<div class="container">&nbsp;
    <h1>Create New Blog</h1>
    <form action="{{ route('blog.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title" required>
            @error('title')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" name="description" required>
            @error('description')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="country_id" class="form-label">Country</label>
            <select class="form-select" id="country_id" name="country_id" required>
                <option value="">Select a Country</option>
                @foreach ($countries as $country)
                    <option value="{{ $country->id }}">{{ $country->name }}</option>
                @endforeach
            </select>
            @error('country_id')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input type="file" class="form-control" id="image" name="image" required accept="image/*">
            @error('image')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="galleries" class="form-label">Thumbnail Image's</label>
            <input type="file" class="form-control" id="galleries" name="galleries[]" required accept="image/*" multiple>
            @error('galleries')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <!-- Display selected images as thumbnails -->
        <div id="image-preview" class="mt-3"></div>

        <button type="submit" class="btn btn-success">Create Blog</button>
        <a href="{{ route('blog.index') }}" class="btn btn-secondary">Back to List</a>
    </form>
</div>

<script>
    // Preview selected images
    document.getElementById("galleries").addEventListener("change", function(event) {
        const files = event.target.files;
        const previewContainer = document.getElementById("image-preview");
        previewContainer.innerHTML = ""; // Clear previous previews

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                imgElement.classList.add("img-thumbnail", "me-2");
                imgElement.style.maxWidth = "100px";
                imgElement.style.maxHeight = "100px";
                previewContainer.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        });
    });
</script>
@endsection

