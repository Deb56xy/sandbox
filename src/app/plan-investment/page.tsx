"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PieChart, TrendingUp, LineChart } from "lucide-react"

// --- SIP CALCULATOR LOGIC ---
const calculateSIPAmount = (targetAmount: number, years: number, rate: number) => {
  const n = years * 12
  const i = rate / 100 / 12
  const monthlyAmount = targetAmount / (((Math.pow((1 + i), n) - 1) * (1 + i)) / i)
  return monthlyAmount
}

const SIPCalculator = () => {
  const [targetAmount, setTargetAmount] = useState<string>("10000000")
  const [years, setYears] = useState<string>("20")
  const [rate, setRate] = useState<string>("12")
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0)
  const [showPANForm, setShowPANForm] = useState<boolean>(false)
  const [panNumber, setPanNumber] = useState<string>("")

  useEffect(() => {
    const amount = Number(targetAmount)
    const yrs = Number(years)
    const rt = Number(rate)
    if (amount > 0 && yrs > 0 && rt > 0) {
      const monthly = calculateSIPAmount(amount, yrs, rt)
      setMonthlyAmount(monthly)
    }
  }, [targetAmount, years, rate])

  // Chart Data
  const generateChartData = () => {
    const data = []
    const yrs = Number(years)
    const monthly = monthlyAmount
    const rt = Number(rate) / 100 / 12
    let sipTotal = 0
    let investmentTotal = 0
    for (let i = 0; i <= yrs; i++) {
      sipTotal = monthly * (((Math.pow((1 + rt), i * 12) - 1) * (1 + rt)) / rt)
      investmentTotal = monthly * i * 12
      data.push({ year: i, sip: sipTotal, investment: investmentTotal })
    }
    return data
  }
  const chartData = generateChartData()

  return (
    <div className="bg-[#10172A] p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">SIP Calculator</h2>
      <p className="text-gray-300 mb-4">Get a plan to invest a fixed amount every month and achieve your desired savings</p>
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-gray-300 mb-1">I want to make</label>
          <div className="flex items-center">
            <span className="text-white mr-2">₹</span>
            <input
              type="text"
              value={targetAmount}
              onChange={e => setTargetAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#181F36] text-white border border-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-300 mb-1">for</label>
          <div className="flex items-center">
            <input
              type="text"
              value={years}
              onChange={e => setYears(e.target.value)}
              className="w-32 px-4 py-2 rounded-lg bg-[#181F36] text-white border border-gray-700 focus:outline-none"
            />
            <span className="text-white ml-2">Years</span>
          </div>
        </div>
        <div>
          <label className="block text-gray-300 mb-1">expected return of</label>
          <div className="flex items-center">
            <input
              type="text"
              value={rate}
              onChange={e => setRate(e.target.value)}
              className="w-32 px-4 py-2 rounded-lg bg-[#181F36] text-white border border-gray-700 focus:outline-none"
            />
            <span className="text-white ml-2">%</span>
          </div>
        </div>
      </div>
      {/* Chart representation */}
      <div className="h-40 mb-6 relative">
        <div className="absolute inset-0 flex items-end">
          {chartData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center" style={{ height: '100%' }}>
              {index > 0 && (
                <>
                  <div className="w-full flex items-end" style={{ height: '80%' }}>
                    <div
                      className="w-1/2 bg-cyan-500 rounded-t-sm mr-px"
                      style={{ height: `${Math.min(100, (point.sip / (chartData[chartData.length - 1].sip)) * 100)}%` }}
                    ></div>
                    <div
                      className="w-1/2 bg-blue-500 rounded-t-sm ml-px"
                      style={{ height: `${Math.min(100, (point.investment / (chartData[chartData.length - 1].sip)) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{point.year}</div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="absolute top-2 right-2 flex items-center text-xs">
          <span className="flex items-center mr-3">
            <div className="w-3 h-3 bg-cyan-500 rounded-full mr-1"></div>
            <span className="text-gray-300">SIP amount</span>
          </span>
          <span className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-gray-300">Total investment</span>
          </span>
        </div>
      </div>
      {/* Results */}
      <div className="bg-[#0A1123] rounded-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <div className="text-gray-400 mb-1">You'll need to invest</div>
          <div className="text-4xl font-bold text-green-400">
            ₹ {monthlyAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}<span className="text-sm text-gray-400">/month</span>
          </div>
        </div>
        <LineChart className="text-cyan-400 w-10 h-10" />
      </div>
      {/* PAN form */}
      <div className="bg-[#0A1123] rounded-lg p-6">
        <div className="text-lg font-semibold text-white mb-3">Ready to plan your SIP?</div>
        {!showPANForm ? (
          <motion.button
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-2 rounded-lg text-white font-medium"
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowPANForm(true)}
          >
            Start Now
          </motion.button>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your PAN"
              value={panNumber}
              onChange={e => setPanNumber(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-[#181F36] text-white border border-gray-700 focus:outline-none"
            />
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg text-white font-medium"
              whileHover={{ scale: 1.02 }}
            >
              Start Now
            </motion.button>
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-4">
        Terms and conditions: This calculator is meant for investor education purpose only and not aimed at soliciting investments in any particular scheme.
      </div>
    </div>
  )
}

// --- PRODUCT COMPARISON LOGIC ---
const products = [
  {
    name: "PPF",
    min: 500,
    max: 150000,
    banks: [
      {
        name: "SBI",
        rate: "7.1%",
        risk: "Very Low",
        link: "https://onlinesbi.sbi"
      },
      {
        name: "PNB",
        rate: "7.1%",
        risk: "Very Low",
        link: "https://www.pnbindia.in/procedure-to-open-ppf-account.html"
      },
      {
        name: "HDFC",
        rate: "7.1%",
        risk: "Very Low",
        link: "https://www.hdfcbank.com/personal/save/accounts/public-provident-fund-ppf"
      }
    ],
    tenure: "15 years",
    liquidity: "Low (15 years lock-in)",
    tax: "EEE (tax-free)"
  },
  {
    name: "FD",
    min: 1000,
    max: Number.MAX_SAFE_INTEGER,
    banks: [
      {
        name: "SBI",
        rate: "6.70% (1Y), 6.75% (3Y), 6.50% (5Y), 7.25% (special)",
        risk: "Very Low",
        link: "https://www.paisabazaar.com/fixed-deposit/sbi-fd-rates/"
      },
      {
        name: "PNB",
        rate: "6.80% (1Y), 6.75% (3Y), 6.25% (5Y), 7.10% (special)",
        risk: "Very Low",
        link: "hhttps://www.pnbindia.in/Interest-Rates-Deposit.html"
      },
      {
        name: "HDFC",
        rate: "6.60% (1Y), 6.90% (3Y), 6.75% (5Y), 7.05% (special)",
        risk: "Very Low",
        link: "hhttps://www.hdfcbank.com/personal/save/deposits/fixed-deposit"
      }
    ],
    tenure: "7 days–10 years",
    liquidity: "Medium (premature penalty)",
    tax: "Taxable (80C for tax-saver FD)"
  },
  {
    name: "Mutual Fund",
    min: 100,
    max: Number.MAX_SAFE_INTEGER,
    banks: [
      {
        name: "SBI",
        rate: "SBI Contra Fund: 36.7% (5Y)",
        risk: "Very High",
        link: "https://www.sbimf.com"
      },
      {
        name: "PNB",
        rate: "PNB Principal Emerging Bluechip: 13.4% (5Y)",
        risk: "High",
        link: "https://www.pnbindia.in/mutual-fund.html"
      },
      {
        name: "HDFC",
        rate: "HDFC Flexi Cap Fund: ~18-20% (5Y)",
        risk: "Very High",
        link: "https://www.hdfcfund.com"
      }
    ],
    tenure: "Flexible",
    liquidity: "High (can redeem anytime)",
    tax: "Taxable (ELSS under 80C)"
  }
]

function getSuggestions(amount: number) {
  if (isNaN(amount) || amount <= 0) return []
  const suggestions: typeof products = []
  if (amount >= products[2].min) suggestions.push(products[2])
  if (amount >= products[0].min && amount <= products[0].max) suggestions.push(products[0])
  if (amount >= products[1].min) suggestions.push(products[1])
  if (amount > 150000) {
    suggestions.push({
      ...products[0],
      name: "PPF (max ₹1.5 lakh/year)",
    })
  }
  return Array.from(new Set(suggestions))
}

const CompareProducts = () => {
  const [amount, setAmount] = useState("")
  const [showComparison, setShowComparison] = useState(false)
  const amountNum = Number(amount)
  const suggestions = getSuggestions(amountNum)

  return (
    <div className="bg-[#10172A] p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">Compare Products</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          setShowComparison(true)
        }}
        className="mb-6"
      >
        <label className="block mb-2 text-cyan-300 font-medium">
          Enter Amount to Compare Products (₹)
        </label>
        <input
          type="number"
          className="px-4 py-2 rounded bg-[#181F36] text-white border border-gray-700 mb-4"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded"
        >
          Compare
        </button>
      </form>
      {showComparison && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-cyan-400">Suggestions for ₹{amountNum.toLocaleString()}</h2>
          {suggestions.length === 0 ? (
            <div className="text-red-400">No products available for this amount.</div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {suggestions.map(product => (
                  <div key={product.name} className="bg-[#181F36] rounded-lg p-4 border border-cyan-900">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg">{product.name}</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      <b>Tenure:</b> {product.tenure} | <b>Liquidity:</b> {product.liquidity}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      <b>Tax Benefit:</b> {product.tax}
                    </div>
                    <div className="flex flex-col gap-1">
                      {product.banks.map(bank => (
                        <div key={bank.name} className="flex items-center gap-2">
                          <span className="font-semibold">{bank.name}:</span>
                          <span className="text-green-400">{bank.rate}</span>
                          <span className="text-yellow-400">{bank.risk}</span>
                          <a
                            href={bank.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-400"
                          >
                            Open/Details
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-bold mb-2 text-purple-300 text-center">Comparison Table</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm bg-[#10172A] rounded-lg mb-6">
                  <thead>
                    <tr>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-left">Bank</th>
                      <th className="p-2 text-left">Rate</th>
                      <th className="p-2 text-left">Risk</th>
                      <th className="p-2 text-left">Min</th>
                      <th className="p-2 text-left">Max</th>
                      <th className="p-2 text-left">Tenure</th>
                      <th className="p-2 text-left">Liquidity</th>
                      <th className="p-2 text-left">Tax</th>
                      <th className="p-2 text-left">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product =>
                      product.banks.map(bank => (
                        <tr key={product.name + bank.name}>
                          <td className="p-2">{product.name}</td>
                          <td className="p-2">{bank.name}</td>
                          <td className="p-2">{bank.rate}</td>
                          <td className="p-2">{bank.risk}</td>
                          <td className="p-2">₹{product.min.toLocaleString()}</td>
                          <td className="p-2">{product.max === Number.MAX_SAFE_INTEGER ? "No Limit" : `₹${product.max.toLocaleString()}`}</td>
                          <td className="p-2">{product.tenure}</td>
                          <td className="p-2">{product.liquidity}</td>
                          <td className="p-2">{product.tax}</td>
                          <td className="p-2">
                            <a
                              href={bank.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-blue-400"
                            >
                              Details
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// --- MAIN PAGE ---
export default function PlanInvestmentPage() {
  const [showSIPCalculator, setShowSIPCalculator] = useState(false)

  return (
    <div className="min-h-screen bg-[#050B18] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        Plan Investment
      </h1>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#10172A] p-6 rounded-xl shadow-lg cursor-pointer"
            onClick={() => setShowSIPCalculator(false)}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-cyan-300">Compare Products</h2>
              <PieChart className="text-cyan-400 w-8 h-8" />
            </div>
            <p className="text-gray-300 mb-2">Compare PPF, FD, and Mutual Funds from top banks</p>
            <div className="text-gray-400 text-sm">SBI, PNB, HDFC and more</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`bg-[#10172A] p-6 rounded-xl shadow-lg cursor-pointer ${showSIPCalculator ? 'ring-2 ring-cyan-500' : ''}`}
            onClick={() => setShowSIPCalculator(true)}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-cyan-300">SIP Calculator</h2>
              <TrendingUp className="text-cyan-400 w-8 h-8" />
            </div>
            <p className="text-gray-300 mb-2">Calculate how much you need to invest monthly</p>
            <div className="text-gray-400 text-sm">Plan for your financial goals</div>
          </motion.div>
        </div>
      </div>
      {showSIPCalculator ? <SIPCalculator /> : <CompareProducts />}
    </div>
  )
}
