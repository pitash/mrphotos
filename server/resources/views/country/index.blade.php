@extends('layouts.app')
@section('content')
<h2 class="mt-4">Country List</h2>
@if (session('success'))
    <div id="successAlert" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
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
                        <form action="{{ route('country.toggleStatus', $data->id) }}" method="POST" style="display: inline;">
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

<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Country</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Edit Form -->
                <form id="editForm" method="POST">
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
        fetch(`/country/${dataId}/edit`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('edit_name').value = data.name;

                document.getElementById('editForm').action = `/country/${dataId}`;
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

