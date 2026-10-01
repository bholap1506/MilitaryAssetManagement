import { useEffect, useState } from "react";
import api from "../api";

function Expenditures() {
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);

  const [form, setForm] = useState({
    baseId: "",
    equipmentTypeId: "",
    quantity: "",
    expendedAt: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [basesResponse, equipmentResponse, expendituresResponse] =
        await Promise.all([
          api.get("/api/bases"),
          api.get("/api/equipment-types"),
          api.get("/api/expenditures"),
        ]);

      setBases(basesResponse.data);
      setEquipmentTypes(equipmentResponse.data);
      setExpenditures(expendituresResponse.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load expenditure data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

    try {
      await api.post("/api/expenditures", {
        baseId: Number(form.baseId),
        equipmentTypeId: Number(form.equipmentTypeId),
        quantity: Number(form.quantity),
        expendedAt: form.expendedAt,
      });

      setMessage("Expenditure recorded successfully.");

      setForm({
        baseId: "",
        equipmentTypeId: "",
        quantity: "",
        expendedAt: "",
      });

      await loadData();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to record expenditure."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Asset Expenditures
          </h1>
          <p className="mt-1 text-slate-500">
            Record equipment consumed or expended from a base.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Record Expenditure
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {/* Base */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Base
              </label>

              <select
                name="baseId"
                value={form.baseId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Base</option>

                {bases.map((base) => (
                  <option key={base.id} value={base.id}>
                    {base.name} (ID: {base.id})
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
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                value={form.quantity}
                onChange={handleChange}
                min="1"
                required
                placeholder="Enter quantity"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Expenditure Date
              </label>

              <input
                type="datetime-local"
                name="expendedAt"
                value={form.expendedAt}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-6 py-2.5 font-medium text-white transition hover:bg-red-700"
              >
                Record Expenditure
              </button>
            </div>
          </form>

          {/* Messages */}
          {message && (
            <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* History */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Expenditure History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                    ID
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                    Base
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                    Equipment
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                    Expended At
                  </th>
                </tr>
              </thead>

              <tbody>
                {expenditures.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No expenditure records found.
                    </td>
                  </tr>
                ) : (
                  expenditures.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {item.id}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-700">
                        {item.base?.name || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-700">
                        {item.equipmentType?.name || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm font-medium text-slate-700">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {item.expendedAt
                          ? new Date(item.expendedAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Expenditures;
