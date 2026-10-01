import { useEffect, useState } from "react";
import api from "../api";

function Assignments() {
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [form, setForm] = useState({
    baseId: "",
    equipmentTypeId: "",
    personnelName: "",
    quantity: "",
    assignedAt: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [basesRes, equipmentRes, assignmentsRes] =
        await Promise.all([
          api.get("/api/bases"),
          api.get("/api/equipment-types"),
          api.get("/api/assignments"),
        ]);

      setBases(basesRes.data);
      setEquipmentTypes(equipmentRes.data);
      setAssignments(assignmentsRes.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load assignment data.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.baseId ||
      !form.equipmentTypeId ||
      !form.personnelName ||
      !form.quantity ||
      !form.assignedAt
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(form.quantity) <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    try {
      await api.post("/api/assignments", {
        baseId: Number(form.baseId),
        equipmentTypeId: Number(form.equipmentTypeId),
        personnelName: form.personnelName,
        quantity: Number(form.quantity),
        assignedAt: form.assignedAt,
      });

      setMessage("Asset assigned successfully.");

      setForm({
        baseId: "",
        equipmentTypeId: "",
        personnelName: "",
        quantity: "",
        assignedAt: "",
      });

      const response = await api.get("/api/assignments");
      setAssignments(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to create assignment. Please try again."
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Asset Assignments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Assign military equipment to personnel and track assignment
            history.
          </p>
        </div>

        {/* Form */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Create Assignment
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the personnel and asset assignment details.
            </p>
          </div>

          {message && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">

              {/* Base */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Base
                </label>

                <select
                  name="baseId"
                  value={form.baseId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Base</option>

                  {bases.map((base) => (
                    <option key={base.id} value={base.id}>
                      {base.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Equipment Type
                </label>

                <select
                  name="equipmentTypeId"
                  value={form.equipmentTypeId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Equipment</option>

                  {equipmentTypes.map((equipment) => (
                    <option key={equipment.id} value={equipment.id}>
                      {equipment.name} - {equipment.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personnel */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Personnel Name
                </label>

                <input
                  type="text"
                  name="personnelName"
                  value={form.personnelName}
                  onChange={handleChange}
                  placeholder="Enter personnel name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Assignment Date
                </label>

                <input
                  type="datetime-local"
                  name="assignedAt"
                  value={form.assignedAt}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Assign Asset
              </button>
            </div>

          </form>
        </div>

        {/* History */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Assignment History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Assets currently recorded against personnel.
            </p>
          </div>

          {assignments.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-500">
                No assignments recorded yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-full divide-y divide-slate-200">

                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      ID
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Base
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Equipment
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Personnel
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Quantity
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Assigned At
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">

                  {assignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                        #{assignment.id}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {assignment.base?.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {assignment.equipmentType?.name}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                        {assignment.personnelName}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                        {assignment.quantity}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {formatDate(assignment.assignedAt)}
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Assignments;
