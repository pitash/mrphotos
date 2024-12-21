@extends('layouts.app')

@section('content')
<div class="d-flex justify-content-between align-items-center mt-4 mb-4">
    <h2 class="fw-bold text-primary mb-0">
        <i class="fas fas fa-clone me-2"></i> Category List
    </h2>

    <div>
        <button type="button" class="btn btn-gradient-primary shadow-sm d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#createModal" style="background: linear-gradient(135deg, #4e73df, #224abe); border: none;">
            <i class="fas fa-plus-circle me-2"></i> Create Category
        </button>
    </div>
</div>
@if (session('success'))
    <div id="successAlert" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
@if ($errors->any())
    <div id="errorAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
        <ul class="mb-0">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
<ol class="breadcrumb bg-light p-3 rounded shadow-sm">
    <li class="breadcrumb-item">
        <a href="#" class="text-decoration-none text-primary">
            <i class="fas fa-tachometer-alt me-1"></i> Dashboard
        </a>
    </li>
    <li class="breadcrumb-item active text-muted">
        <i class="fas fas fa-clone me-1"></i> Category
    </li>
</ol>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Category List
    </div>
    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach ($datas as $data)
                <tr>
                    <td>{{ $data->name }}</td>
                    <td>
                        <form action="{{ route('category.toggleStatus', $data->id) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('PATCH')

                            @if ($data->is_active)
                                <button type="submit" class="btn btn-danger btn-sm">Deactivate</button>
                            @else
                                <button type="submit" class="btn btn-success btn-sm">Activate</button>
                            @endif
                        </form>

                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editData({{ $data->id }})">
                            Edit
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>

<!-- Create Modal -->
<div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createModalLabel">Create New Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createForm" action="{{ route('category.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" required value="{{ old('name') }}">

                        @if ($errors->has('name'))
                            <div class="alert alert-danger mt-2">
                                {{ $errors->first('name') }}
                            </div>
                        @endif
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" id="createBtn">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Edit Form -->
                <form id="editForm" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')

                    <div class="mb-3">
                        <label for="edit_name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="edit_name" name="name" required>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" id="editBtn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    function editData(dataId) {
        fetch(`/category/${dataId}/edit`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('edit_name').value = data.name;

                document.getElementById('editForm').action = `/category/${dataId}`;
            })
            .catch(error => console.error('Error:', error));
    }

    // Disable buttons on form submit
    document.getElementById('createForm').addEventListener('submit', function(event) {
        const createBtn = document.getElementById('createBtn');
        createBtn.disabled = true;
        createBtn.textContent = "Saving...";
    });

    document.getElementById('editForm').addEventListener('submit', function(event) {
        const editBtn = document.getElementById('editBtn');
        editBtn.disabled = true;
        editBtn.textContent = "Updating...";
    });



</script>

@endsection

