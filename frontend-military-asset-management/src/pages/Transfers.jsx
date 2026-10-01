import { useEffect, useState } from "react";
import api from "../api";

function Transfers() {
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [form, setForm] = useState({
    fromBaseId: "",
    toBaseId: "",
    equipmentTypeId: "",
    quantity: "",
    transferDate: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [basesResponse, equipmentResponse, transfersResponse] =
        await Promise.all([
          api.get("/api/bases"),
          api.get("/api/equipment-types"),
          api.get("/api/transfers"),
        ]);

      setBases(basesResponse.data);
      setEquipmentTypes(equipmentResponse.data);
      setTransfers(transfersResponse.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load transfer data.");
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

    if (!form.fromBaseId || !form.toBaseId) {
      setError("Please select both source and destination bases.");
      return;
    }

    if (form.fromBaseId === form.toBaseId) {
      setError("From Base and To Base cannot be the same.");
      return;
    }

    if (!form.equipmentTypeId) {
      setError("Please select an equipment type.");
      return;
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    if (!form.transferDate) {
      setError("Please select a transfer date.");
      return;
    }

    try {
      await api.post("/api/transfers", {
        fromBaseId: Number(form.fromBaseId),
        toBaseId: Number(form.toBaseId),
        equipmentTypeId: Number(form.equipmentTypeId),
        quantity: Number(form.quantity),
        transferDate: form.transferDate,
      });

      setMessage("Transfer recorded successfully.");

      setForm({
        fromBaseId: "",
        toBaseId: "",
        equipmentTypeId: "",
        quantity: "",
        transferDate: "",
      });

      const response = await api.get("/api/transfers");
      setTransfers(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to record transfer. Please try again."
      );
    }
  };

  const getBaseName = (id) => {
    const base = bases.find((b) => b.id === id);
    return base ? base.name : `Base ${id}`;
  };

  const getEquipmentName = (id) => {
    const equipment = equipmentTypes.find((e) => e.id === id);
    return equipment ? equipment.name : `Equipment ${id}`;
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
            Asset Transfers
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Transfer military assets between bases and view transfer history.
          </p>
        </div>

        {/* Transfer Form Card */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Record New Transfer
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the asset movement details below.
            </p>
          </div>

          {/* Messages */}
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

              {/* From Base */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  From Base
                </label>

                <select
                  name="fromBaseId"
                  value={form.fromBaseId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Base</option>

                  {bases.map((base) => (
                    <option key={base.id} value={base.id}>
                      {base.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Base */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  To Base
                </label>

                <select
                  name="toBaseId"
                  value={form.toBaseId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Equipment</option>

                  {equipmentTypes.map((equipment) => (
                    <option key={equipment.id} value={equipment.id}>
                      {equipment.name} - {equipment.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Transfer Date
                </label>

                <input
                  type="datetime-local"
                  name="transferDate"
                  value={form.transferDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Record Transfer
              </button>
            </div>
          </form>
        </div>

        {/* Transfer History */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Transfer History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent asset movements between military bases.
            </p>
          </div>

          {transfers.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-500">
                No transfers recorded yet.
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
                      From Base
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      To Base
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Equipment
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Quantity
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Transfer Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {transfers.map((transfer) => (
                    <tr
                      key={transfer.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                        #{transfer.id}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {transfer.fromBase?.name ||
                          getBaseName(transfer.fromBase?.id)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {transfer.toBase?.name ||
                          getBaseName(transfer.toBase?.id)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {transfer.equipmentType?.name ||
                            getEquipmentName(transfer.equipmentType?.id)}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                        {transfer.quantity}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {formatDate(transfer.transferDate)}
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

export default Transfers;
