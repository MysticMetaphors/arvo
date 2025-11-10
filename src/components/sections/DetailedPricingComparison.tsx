"use client";

import Link from "next/link";

export default function DetailedPricingComparison() {
  const plans = [
    {
      name: "Basic",
      info: "Landing page, responsive design",
      price: "₱69,999 - ₱174,999",
      pages: "3 Main Page, 2 Inner pages (Custom Design)",
      social: "1 Social Network",
      maintenance: "1 Month Free Maintenance (Minor Revisions and Data Uploading)",
      features: [
        "Responsive Design",
        "SEO Setup",
        "Contact form",
        "SSL",
      ],
    },
    {
      name: "Growth",
      info: "E-commerce site, payment integration",
      price: "₱174,999 - ₱499,999",
      pages: "7 Main Page, 4-5 Inner pages (Custom Design)",
      social: "2 Social Network",
      maintenance: "1 Month Free Maintenance (Minor Revisions and Data Uploading)",
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
      info: "Full custom web solution, advanced features",
      price: "₱599,999 - ₱999,999",
      pages: "Unlimited Pages (Custom Design)",
      social: "3 Social Network",
      maintenance: "1 Month Free Maintenance (Minor Revisions and Data Uploading)",
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
    <div className="w-full">
      <div className="w-full relative z-10 flex justify-center">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-lg">
          <table className="w-full border border-gray-800">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="py-4 px-6 text-left">Features</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="py-4 px-6 text-center">
                    <div className="text-lg font-bold text-green-primary">{plan.name}</div>
                    <span className="text-md font-semibold text-gray-300">{plan.info}</span>
                    <div className="text-md font-normal text-gray-400 mt-1">
                      {plan.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-gray-800/70">
              {/* Static Rows */}
              <tr className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition">
                <td className="py-4 px-6 text-left text-gray-300">Page</td>
                {plans.map((plan, i) => (
                  <td key={i} className="py-4 px-6 text-center">
                    {plan.pages}
                  </td>
                ))}
              </tr>

              <tr className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition">
                <td className="py-4 px-6 text-left text-gray-300">Social Network</td>
                {plans.map((plan, i) => (
                  <td key={i} className="py-4 px-6 text-center">
                    {plan.social === "none" ? (
                      <div className="flex justify-center">
                        <div className="rounded-full w-5 h-5 flex items-center justify-center bg-red-400/60">
                          <i className="fa-solid fa-xmark text-sm text-white"></i>
                        </div>
                      </div>
                    ) : (
                      plan.social
                    )}
                  </td>
                ))}
              </tr>

              <tr className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition">
                <td className="py-4 px-6 text-left text-gray-300">Maintenance</td>
                {plans.map((plan) => (
                  <td key={plan.name} className="py-4 px-6 text-center">
                    {plan.maintenance}
                  </td>
                ))}
              </tr>

              {/* Dynamic Features */}
              {[...new Set(plans.flatMap((p) => p.features))].map((feature, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-800 divide-x divide-gray-800 hover:bg-gray-800/70 transition"
                >
                  <td className="py-4 px-6 text-left text-gray-300">{feature}</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {plan.features.includes(feature) ? (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-400/60">
                            <i className="fa-solid fa-check text-xs text-white"></i>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-red-400/60">
                            <i className="fa-solid fa-xmark text-xs text-white"></i>
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden max-w-sm sm:max-w-full grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition flex flex-col justify-between h-full
                        ${i === plans.length - 1 ? "lg:col-sapn-1 sm:col-span-2" : ""}`}
            >
              <div>
                <div className="text-xl font-bold text-green-primary mb-1">{plan.name}</div>
                <div className="text-gray-400 mb-4">{plan.price}</div>

                <ul className={`mb-2 ${i === plans.length - 1 ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6" : "space-y-2"}`}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 pb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-400/60">
                        <i className="fa-solid fa-check text-xs text-white"></i>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom static info */}
              <ul className="space-y-2 mt-auto pt-6 border-t border-gray-800">
                <li className="text-gray-400">
                  <strong className="text-gray-300">Page:</strong> {plan.pages}
                </li>
                <li className="text-gray-400">
                  <strong className="text-gray-300">Social Network:</strong>{" "}
                  {plan.social === "none" ? (
                    <span className="text-red-400/80 font-semibold">Not included</span>
                  ) : (
                    plan.social
                  )}
                </li>
                <li className="text-gray-400">
                  <strong className="text-gray-300">Maintenance:</strong> {plan.maintenance}
                </li>
              </ul>

              {/* Button */}
              <div className="mt-5 text-center">
                <Link
                  href="/contact"
                  className="text-white bg-gradient-to-r from-green-900 to-green-700 border border-gray-800 font-semibold rounded-lg text-sm px-5 py-2.5"
                >
                  Get started
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

  );
}
