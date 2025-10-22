"use client";

type DetailedPricingProps = {
  maxWidth?: string;
};

export default function DetailedPricingComparison({maxWidth}: DetailedPricingProps) {
  const plans = [
    {
      name: "Basic",
      price: "₱69,999 - ₱174,999",
      features: [
        "Responsive Design",
        "SEO Setup",
        "Contact form",
        "SSL",
      ],
    },
    {
      name: "Growth",
      price: "₱174,999 - ₱499,999",
      features: [
        "Responsive Design",
        "SEO Setup",
        "Contact form",
        "SSL",
        "Business Email",
        "User Dashboard",
        "Payment Integration",
      ],
    },
    {
      name: "Advance",
      price: "₱599,999 - ₱999,999",
      features: [
        "Responsive Design",
        "SEO Setup",
        "Contact form",
        "SSL",
        "Business Email",
        "User Dashboard",
        "Payment Integration",
        "Role-based admin panels",
        "Workflow automation",
        "Reporting",
      ],
    },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className={`min-w-[${maxWidth}] border border-gray-800 overflow-hidden`}>
        <thead className="bg-gray-900 text-gray-300">
          <tr>
            <th className="py-4 px-6 text-left">Features</th>
            {plans.map((plan) => (
              <th key={plan.name} className="py-4 px-6">
                <div className="text-lg font-bold text-green-primary">
                  {plan.name}
                </div>
                <div className="text-md font-normal text-gray-400 mt-1">
                  {plan.price}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-gray-800/50">
          <tr className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition">
            <td className="py-4 px-6 text-left text-gray-300">
              Page
            </td>
            <td className="py-4 px-6 text-center">
              3 Main Page, 2 Inner pages (Custom Design)
            </td>
            <td className="py-4 px-6 text-center">
              7 Main Page, 4-5 Inner pages (Custom Design)
            </td>
            <td className="py-4 px-6 text-center">
              Unlimited Pages (Custom Design)
            </td>
          </tr>
          <tr className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition">
            <td className="py-4 px-6 text-left text-gray-300">
              Social Network
            </td>
            <td className="py-4 px-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full w-5 h-5 flex items-center justify-center bg-red-400/60">
                  <i className="fa-solid fa-xmark text-sm text-white"></i>
                </div>
              </div>
            </td>
            <td className="py-4 px-6 text-center">
              2 Social Network
            </td>
            <td className="py-4 px-6 text-center">
              3 Social Network
            </td>
          </tr>
          <tr className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition">
            <td className="py-4 px-6 text-left text-gray-300">
              Maintainance
            </td>
            <td className="py-4 px-6 text-center">
              15 Days Free Maintenance <br />
              (Minor Revisions and Data Uploading)
            </td>
            <td className="py-4 px-6 text-center" colSpan={2}>
              1 Month Free Maintenance <br />
              (Minor Revisions and Data Uploading)
            </td>
          </tr>
          {[
            ...new Set(plans.flatMap((plan) => plan.features)),
          ].map((feature, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition"
            >
              <td className="py-4 px-6 text-left text-gray-300">
                {feature}
              </td>

              {plans.map((plan) => (
                <td key={plan.name} className="py-4 px-6">
                  <div className="flex justify-center">
                    {plan.features.includes(feature) ? (
                      <div className="rounded-full w-5 h-5 flex items-center justify-center bg-green-400/60">
                        <i className="fa-solid fa-check text-sm text-white"></i>
                      </div>
                    ) : (
                      <div className="rounded-full w-5 h-5 flex items-center justify-center bg-red-400/60">
                        <i className="fa-solid fa-xmark text-sm text-white"></i>
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition">
            <td className="py-4 px-6 text-left text-gray-300">

            </td>
            <td className="py-4 px-6 text-center">
              <a
                href="#"
                className="mt-auto text-white bg-gradient-to-r from-green-900 to-green-700 border border-gray-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </a>
            </td>
            <td className="py-4 px-6 text-center">
              <a
                href="#"
                className="mt-auto text-white bg-gradient-to-r from-green-900 to-green-700 border border-gray-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </a>
            </td>
            <td className="py-4 px-6 text-center">
              <a
                href="#"
                className="mt-auto text-white bg-gradient-to-r from-green-900 to-green-700 border border-gray-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
