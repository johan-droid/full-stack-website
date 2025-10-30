import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaymentHistory.css'

const PaymentHistory = () => {
  const navigate = useNavigate()
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  // Mock payment history data
  const [paymentHistory] = useState([
    {
      id: 1,
      planName: '6 Months Plan',
      planType: 'six-monthly',
      amount: 499,
      currency: '₹',
      paymentDate: '2024-01-15',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      status: 'active',
      paymentMethod: 'UPI',
      transactionId: 'TXN_20240115_ABC123',
      invoiceNumber: 'INV-2024-001',
      features: [
        'Access to resume database',
        'Advanced search filters',
        'Priority support',
        'Analytics dashboard',
        'Bulk candidate management'
      ],
      autoRenewal: true,
      nextBillingDate: '2024-07-15'
    },
    {
      id: 2,
      planName: 'Monthly Plan',
      planType: 'monthly',
      amount: 399,
      currency: '₹',
      paymentDate: '2023-12-15',
      startDate: '2023-12-15',
      endDate: '2024-01-15',
      status: 'expired',
      paymentMethod: 'UPI',
      transactionId: 'TXN_20231215_DEF456',
      invoiceNumber: 'INV-2023-012',
      features: [
        'Access to resume database',
        'Search and filter candidates',
        'Create and post jobs',
        'Email support'
      ],
      autoRenewal: false,
      nextBillingDate: null
    },
    {
      id: 3,
      planName: 'Yearly Plan',
      planType: 'yearly',
      amount: 599,
      currency: '₹',
      paymentDate: '2023-06-15',
      startDate: '2023-06-15',
      endDate: '2024-06-15',
      status: 'expired',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN_20230615_GHI789',
      invoiceNumber: 'INV-2023-006',
      features: [
        'Everything in 6 Months',
        'Unlimited job postings',
        'Custom branding',
        'API access',
        'Dedicated account manager'
      ],
      autoRenewal: false,
      nextBillingDate: null
    }
  ])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="status-badge active">Active</span>
      case 'expired':
        return <span className="status-badge expired">Expired</span>
      case 'cancelled':
        return <span className="status-badge cancelled">Cancelled</span>
      default:
        return <span className="status-badge unknown">Unknown</span>
    }
  }

  const getPlanIcon = (planType) => {
    switch (planType) {
      case 'monthly':
        return '📅'
      case 'six-monthly':
        return '📊'
      case 'yearly':
        return '👑'
      default:
        return '💼'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount, currency) => {
    return `${currency}${amount.toLocaleString('en-IN')}`
  }

  const calculateDaysRemaining = (endDate) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleDownloadInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    // In a real app, this would generate and download the actual invoice
    alert(`Downloading invoice ${invoice.invoiceNumber}...`)
  }

  const handleRenewSubscription = (planId) => {
    alert('Redirecting to payment page for subscription renewal...')
    // In a real app, this would redirect to payment page
  }

  const getCurrentSubscription = () => {
    return paymentHistory.find(payment => payment.status === 'active')
  }

  const currentSubscription = getCurrentSubscription()

  return (
    <div className="payment-history-container">
      <div className="payment-history-header">
        <button className="back-btn" onClick={() => navigate('/organization-home')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>
        <h1>Payment History</h1>
      </div>

      <div className="payment-history-content">
        {/* Current Subscription Card */}
        {currentSubscription && (
          <div className="current-subscription-card">
            <div className="subscription-header">
              <div className="subscription-info">
                <div className="plan-icon">{getPlanIcon(currentSubscription.planType)}</div>
                <div className="plan-details">
                  <h2>{currentSubscription.planName}</h2>
                  <p>Current Active Plan</p>
                </div>
              </div>
              {getStatusBadge(currentSubscription.status)}
            </div>

            <div className="subscription-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="label">Amount Paid:</span>
                  <span className="value">{formatCurrency(currentSubscription.amount, currentSubscription.currency)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Payment Date:</span>
                  <span className="value">{formatDate(currentSubscription.paymentDate)}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="label">Subscription Start:</span>
                  <span className="value">{formatDate(currentSubscription.startDate)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Subscription End:</span>
                  <span className="value">{formatDate(currentSubscription.endDate)}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="label">Days Remaining:</span>
                  <span className={`value ${calculateDaysRemaining(currentSubscription.endDate) < 30 ? 'warning' : ''}`}>
                    {calculateDaysRemaining(currentSubscription.endDate)} days
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Auto Renewal:</span>
                  <span className="value">{currentSubscription.autoRenewal ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>

            <div className="subscription-actions">
              <button className="download-invoice-btn" onClick={() => handleDownloadInvoice(currentSubscription)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Download Invoice
              </button>
              
              {calculateDaysRemaining(currentSubscription.endDate) < 30 && (
                <button className="renew-btn" onClick={() => handleRenewSubscription(currentSubscription.id)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4v6h6"></path>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                  Renew Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* Payment History Table */}
        <div className="payment-history-section">
          <div className="section-header">
            <h2>Payment History</h2>
            <p>All your subscription payments and invoices</p>
          </div>

          <div className="payment-table">
            <div className="table-header">
              <div className="header-cell">Plan</div>
              <div className="header-cell">Amount</div>
              <div className="header-cell">Payment Date</div>
              <div className="header-cell">Period</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Actions</div>
            </div>

            {paymentHistory.map((payment) => (
              <div key={payment.id} className="table-row">
                <div className="table-cell plan-cell">
                  <div className="plan-info">
                    <span className="plan-icon">{getPlanIcon(payment.planType)}</span>
                    <div className="plan-details">
                      <span className="plan-name">{payment.planName}</span>
                      <span className="transaction-id">{payment.transactionId}</span>
                    </div>
                  </div>
                </div>

                <div className="table-cell amount-cell">
                  <span className="amount">{formatCurrency(payment.amount, payment.currency)}</span>
                  <span className="payment-method">{payment.paymentMethod}</span>
                </div>

                <div className="table-cell date-cell">
                  <span className="payment-date">{formatDate(payment.paymentDate)}</span>
                </div>

                <div className="table-cell period-cell">
                  <div className="period-info">
                    <span className="start-date">{formatDate(payment.startDate)}</span>
                    <span className="separator">to</span>
                    <span className="end-date">{formatDate(payment.endDate)}</span>
                  </div>
                </div>

                <div className="table-cell status-cell">
                  {getStatusBadge(payment.status)}
                </div>

                <div className="table-cell actions-cell">
                  <button 
                    className="download-btn"
                    onClick={() => handleDownloadInvoice(payment)}
                    title="Download Invoice"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </button>
                  
                  {payment.status === 'expired' && (
                    <button 
                      className="renew-btn-small"
                      onClick={() => handleRenewSubscription(payment.id)}
                      title="Renew Subscription"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 4v6h6"></path>
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Features */}
        {currentSubscription && (
          <div className="features-section">
            <div className="section-header">
              <h2>Current Plan Features</h2>
              <p>What's included in your active subscription</p>
            </div>

            <div className="features-grid">
              {currentSubscription.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing Information */}
        <div className="billing-info-section">
          <div className="section-header">
            <h2>Billing Information</h2>
            <p>Manage your subscription and billing preferences</p>
          </div>

          <div className="billing-cards">
            <div className="billing-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <h3>Payment Method</h3>
              </div>
              <p>UPI •••• 1234</p>
              <button className="update-btn">Update</button>
            </div>

            <div className="billing-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                </svg>
                <h3>Auto Renewal</h3>
              </div>
              <p>{currentSubscription?.autoRenewal ? 'Enabled' : 'Disabled'}</p>
              <button className="update-btn">Manage</button>
            </div>

            <div className="billing-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <h3>Billing Address</h3>
              </div>
              <p>123 Business Park, Mumbai</p>
              <button className="update-btn">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory
