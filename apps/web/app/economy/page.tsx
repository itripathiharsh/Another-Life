'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import { getCurrencyForLocation, getPropertyCatalog, PropertyCatalogItem } from '../../lib/era';

interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  icon: string;
}

export default function EconomyPage(): JSX.Element {
  const { view, buyProperty } = useLife();
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [buyingId, setBuyingId] = useState<string | null>(null);

  const player = view?.player;
  const age = player?.age ?? 0;
  const realWealth = player ? player.wealth : 0;
  const year = view?.date.slice(0, 4) ?? '1946';

  const currency = getCurrencyForLocation(player?.locationId);
  const PROPERTY_CATALOG = getPropertyCatalog(player?.locationId);

  function triggerAction(actionName: string, isError = false): void {
    setActionToast(actionName);
    setTimeout(() => setActionToast(null), 3500);
  }

  async function handleBuyProperty(prop: PropertyCatalogItem): Promise<void> {
    if (realWealth < prop.cost) {
      triggerAction(`Insufficient funds: Requires ${currency.symbol}${prop.cost} (you have ${currency.symbol}${realWealth}).`, true);
      return;
    }
    setBuyingId(prop.id);
    try {
      await buyProperty({
        id: `${prop.id}_${Date.now()}`,
        name: prop.name,
        type: prop.type,
        cost: prop.cost,
        annualYield: prop.annualYield,
      });
      triggerAction(`✓ Acquired deed to ${prop.name}! Added +${currency.symbol}${prop.annualYield}/yr passive yield.`);
    } catch (err) {
      triggerAction(err instanceof Error ? err.message : 'Failed to purchase property', true);
    } finally {
      setBuyingId(null);
    }
  }

  // Derive age-appropriate financial state
  let incomeVal = '+0';
  let expenseVal = '-0';
  let incomeSub = 'Parental Care';
  let expenseSub = 'Covered by Family';
  let housingName = 'Family Home & Cradle';
  let housingType = 'Dependent on Parents';
  let housingCost = '0 coins / month';
  let housingDesc =
    'You live in the family residence. Your parents provide nourishment, swaddling, and shelter.';

  let transactions: Transaction[] = [];

  if (age < 6) {
    incomeVal = '+0';
    expenseVal = '-0';
    incomeSub = 'Parental Provision';
    expenseSub = '0 (Infancy)';
    housingName = 'Family Courtyard & Cradle';
    housingType = 'Parental Guardianship';
    housingCost = 'Free (Family care)';
    housingDesc =
      'You are cared for in your family home. You have no independent income, rent, or debts.';
    transactions = [
      {
        id: 't1',
        date: `Spring ${year}`,
        title: 'Nourishment & clothing provided by parents',
        amount: 0,
        icon: '🍼',
      },
      {
        id: 't2',
        date: `Winter ${year}`,
        title: 'Gifted a silver protection locket by grandmother',
        amount: 0,
        icon: '✨',
      },
      {
        id: 't3',
        date: `New Year ${year}`,
        title: 'Family holiday meal and celebratory sweets',
        amount: 0,
        icon: '🍯',
      },
    ];
  } else if (age >= 6 && age < 14) {
    incomeVal = '+1';
    expenseVal = '-0';
    incomeSub = 'Weekly Allowance';
    expenseSub = 'Living at Home';
    housingName = 'Family Residence';
    housingType = 'Living with Parents';
    housingCost = 'Free (Child dependent)';
    housingDesc =
      'You live in the family home while attending local primary school. Food and lodging are provided.';
    transactions = [
      {
        id: 't1',
        date: `12 Oct ${year}`,
        title: 'Received pocket allowance from father',
        amount: 1,
        icon: '🪙',
      },
      {
        id: 't2',
        date: `08 Oct ${year}`,
        title: 'Bought roasted chickpeas and sweet candy at bazaar',
        amount: -1,
        icon: '🍬',
      },
      {
        id: 't3',
        date: `01 Oct ${year}`,
        title: 'Received slate pencil and notebook for school',
        amount: 0,
        icon: '📖',
      },
      {
        id: 't4',
        date: `15 Sep ${year}`,
        title: 'Earned a copper coin for helping sweep the courtyard',
        amount: 1,
        icon: '🧹',
      },
    ];
  } else if (age >= 14 && age < 18) {
    incomeVal = player?.occupationId ? '+8' : '+2';
    expenseVal = '-2';
    incomeSub = player?.occupationId ? 'Apprentice Stipend' : 'Youth Allowance';
    expenseSub = 'Personal Supplies';
    housingName = player?.occupationId ? 'Workshop Quarters / Family Home' : 'Family Residence';
    housingType = 'Youth / Apprentice';
    housingCost = 'Minimal';
    housingDesc =
      'You are an adolescent. You are beginning to accumulate modest personal savings for your future adulthood.';
    transactions = [
      {
        id: 't1',
        date: `01 Nov ${year}`,
        title: player?.occupationId ? 'Received monthly trade apprentice stipend' : 'Family allowance',
        amount: player?.occupationId ? 8 : 2,
        icon: '🔨',
      },
      {
        id: 't2',
        date: `24 Oct ${year}`,
        title: 'Purchased study notebook and drafting ink',
        amount: -2,
        icon: '🖋️',
      },
      {
        id: 't3',
        date: `15 Oct ${year}`,
        title: 'Saved wages into private wooden strongbox',
        amount: 3,
        icon: '🪙',
      },
    ];
  } else {
    // Adult (18+)
    const isEmployed = Boolean(player?.occupationId);
    incomeVal = isEmployed ? '+15' : '+0';
    expenseVal = '-6';
    incomeSub = isEmployed ? 'Monthly Salary' : 'Unemployed';
    expenseSub = 'Rent, Food & Taxes';
    housingName = 'Town Residence / Apartment';
    housingType = 'Rented Residence';
    housingCost = '3 coins / month';
    housingDesc =
      'An independent townhouse located in the central historical quarter, providing comfort and privacy.';
    transactions = [
      {
        id: 't1',
        date: `10 Nov ${year}`,
        title: isEmployed
          ? `Received monthly wages (${player?.occupationId?.replace(/^occupation\./, '').replace(/_/g, ' ')})`
          : 'Odd labor earnings in the market',
        amount: isEmployed ? 15 : 2,
        icon: '🪙',
      },
      {
        id: 't2',
        date: `08 Nov ${year}`,
        title: 'Purchased monthly grain, spices and oil supplies',
        amount: -3,
        icon: '🛒',
      },
      {
        id: 't3',
        date: `05 Nov ${year}`,
        title: 'Paid monthly rent for town accommodation',
        amount: -2,
        icon: '🏠',
      },
      {
        id: 't4',
        date: `02 Nov ${year}`,
        title: 'Purchased historical gazette and stationery',
        amount: -1,
        icon: '📖',
      },
    ];
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Toast Notification */}
      {actionToast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--gold-500)',
            color: '#120e06',
            padding: '10px 22px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: '0.9rem',
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            textAlign: 'center',
            maxWidth: '90%',
          }}
        >
          {actionToast}
        </div>
      )}

      {/* Header */}
      <div>
        <h2>Economy & Finances</h2>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Manage your money, living expenses, and historical assets.
        </div>
      </div>

      {/* Top 3 KPI Cards (Matches Economy & Finances.png) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {/* Total Wealth */}
        <div className="ll-card" style={{ padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: 2 }}>🪙</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Total Wealth</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'var(--cream)',
              margin: '2px 0',
            }}
          >
            {realWealth}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--gold-400)' }}>coins</div>
        </div>

        {/* Monthly Income */}
        <div className="ll-card" style={{ padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: 2 }}>🤲</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Monthly Income</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'var(--green)',
              margin: '2px 0',
            }}
          >
            {incomeVal}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{incomeSub}</div>
        </div>

        {/* Monthly Expenses */}
        <div className="ll-card" style={{ padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: 2 }}>👛</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Monthly Cost</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: '1.2rem',
              color: expenseVal === '-0' ? 'var(--text-muted)' : 'var(--red)',
              margin: '2px 0',
            }}
          >
            {expenseVal}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{expenseSub}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="ll-filter-tabs">
        {['Overview', 'Transactions', 'Assets & Property', 'Financial Actions'].map(
          (tab) => (
            <button
              key={tab}
              type="button"
              className={`ll-filter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Life-Stage Economy Card */}
          <div className="ll-card ll-card-gold" style={{ padding: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)' }}>
                {age < 6
                  ? 'Infancy Financial Status'
                  : age < 14
                    ? 'Childhood Allowance Status'
                    : age < 18
                      ? 'Adolescent Savings Status'
                      : 'Adult Commercial Ledger'}
              </h3>
              <span className="ll-pill gold" style={{ fontSize: '0.72rem' }}>
                Age {age} • {view?.player?.stage ?? 'active'}
              </span>
            </div>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.86rem',
                lineHeight: 1.5,
              }}
            >
              {age < 6
                ? 'As an infant, you are entirely sheltered by your parents. All food, medicine, and swaddling are provided by your household.'
                : age < 14
                  ? 'You receive a small pocket money allowance from your parents. You can save your coins or buy treats at the local bazaar.'
                  : age < 18
                    ? 'You are beginning to earn modest stipends through youth tasks and apprenticeships, building a foundation for independent adulthood.'
                    : 'You manage your own adult income, taxes, rent, and investments. Prudent management builds dynastic generational wealth.'}
            </p>
          </div>

          {/* Living Accommodation Card (Matches Property Card in Mockups) */}
          <section className="ll-card" aria-label="Current Residence">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 8,
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: '1.6rem' }}>🏠</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--cream)' }}>{housingName}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    {housingType}
                  </div>
                </div>
              </div>
              <span className="ll-pill positive" style={{ fontSize: '0.72rem' }}>
                {housingCost}
              </span>
            </div>
            <p
              style={{
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                lineHeight: 1.4,
              }}
            >
              {housingDesc}
            </p>
          </section>

          {/* Recent Ledger Summary */}
          <section className="ll-card" aria-label="Recent Transactions">
            <div className="ll-section-head">
              <h3 className="ll-section-title">
                <span className="ll-section-icon">📜</span> Recent Transactions
              </h3>
              <button
                type="button"
                className="ll-link-gold"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setActiveTab('Transactions')}
              >
                View All →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {transactions.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 8,
                    fontSize: '0.84rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color:
                        item.amount > 0
                          ? 'var(--green)'
                          : item.amount < 0
                            ? 'var(--red)'
                            : 'var(--text-muted)',
                    }}
                  >
                    {item.amount > 0 ? `+${item.amount}` : item.amount}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Tab: Transactions */}
      {activeTab === 'Transactions' && (
        <div className="ll-card" style={{ padding: 16 }}>
          <h3 className="ll-section-title">Historical Financial Ledger</h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.84rem',
              margin: '4px 0 12px',
            }}
          >
            Chronicle of your earnings, gifts, purchases, and living expenses.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {transactions.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                  background: 'var(--bg-secondary)',
                  borderRadius: 8,
                  fontSize: '0.86rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                      {item.date}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    color:
                      item.amount > 0
                        ? 'var(--green)'
                        : item.amount < 0
                          ? 'var(--red)'
                          : 'var(--text-muted)',
                  }}
                >
                  {item.amount > 0 ? `+${item.amount} coins` : `${item.amount} coins`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Assets & Property */}
      {activeTab === 'Assets & Property' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {age < 18 ? (
            <div
              className="ll-card"
              style={{
                background: 'rgba(230, 179, 77, 0.08)',
                borderColor: 'var(--border-gold)',
                padding: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                }}
              >
                <span>🔒</span> Property Ownership Locked (Requires Age 18+)
              </div>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  marginTop: 6,
                  lineHeight: 1.4,
                }}
              >
                Under historical law, minor characters cannot own real estate, take out mortgage
                contracts, or rent apartments independently. You reside securely under family
                guardianship until legal adulthood.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Owned Deeds Section */}
              <div className="ll-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h3 className="ll-section-title" style={{ margin: 0 }}>
                    📜 Owned Real Estate Deeds & Holdings
                  </h3>
                  <span className="ll-pill gold">
                    {player?.properties?.length ?? 0} Deeds Registered
                  </span>
                </div>

                {(!player?.properties || player.properties.length === 0) ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: '4px 0 0', lineHeight: 1.5 }}>
                    You currently hold no real estate deeds. Acquiring property or commercial workshops yields dependable annual passive revenue every year you advance!
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div
                      style={{
                        background: 'rgba(230, 179, 77, 0.08)',
                        border: '1px solid var(--border-gold)',
                        borderRadius: 8,
                        padding: '10px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600 }}>TOTAL PASSIVE INCOME</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--cream)', fontWeight: 700 }}>
                          +{player.properties.reduce((acc, p) => acc + (p.annualYield ?? 0), 0)} Coins / Year
                        </div>
                      </div>
                      <span className="ll-pill positive">Annual Auto-Yield Active</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {player.properties.map((prop, idx) => (
                        <div
                          key={`${prop.id}-${idx}`}
                          className="ll-card"
                          style={{
                            padding: 12,
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                            <div style={{ fontWeight: 700, color: 'var(--cream)', fontSize: '0.92rem' }}>
                              {prop.name}
                            </div>
                            <span className="ll-pill positive" style={{ fontSize: '0.7rem' }}>
                              +{prop.annualYield} / yr
                            </span>
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: 4 }}>
                            Deed Type: <span style={{ textTransform: 'capitalize', color: 'var(--text-muted)' }}>{prop.type}</span> • Acquired at Age {prop.acquiredAge}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gold-400)' }}>
                            Deed Value: {prop.value} Coins
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Property Market Catalog */}
              <div className="ll-card" style={{ padding: 16 }}>
                <h3 className="ll-section-title" style={{ marginBottom: 12 }}>
                  🏛️ Real Estate & Commercial Market
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {PROPERTY_CATALOG.map((prop) => {
                    const canAfford = realWealth >= prop.cost;
                    const isBusy = buyingId === prop.id;
                    return (
                      <div
                        key={prop.id}
                        className="ll-card"
                        style={{
                          padding: 14,
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{prop.icon}</span>
                            <div>
                              <h4 style={{ color: 'var(--cream)', margin: '0 0 2px' }}>{prop.name}</h4>
                              <div style={{ fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600 }}>
                                Annual Yield: +{currency.symbol}{prop.annualYield} / year
                              </div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.4 }}>
                                {prop.description}
                              </p>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <span className="ll-pill gold" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                              {currency.symbol}{prop.cost}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={canAfford ? 'll-btn-gold' : 'll-btn-outline'}
                          disabled={!canAfford || isBusy}
                          style={{
                            width: '100%',
                            marginTop: 10,
                            padding: '8px 12px',
                            fontSize: '0.84rem',
                            opacity: canAfford ? 1 : 0.6,
                            cursor: canAfford ? 'pointer' : 'not-allowed',
                          }}
                          onClick={() => void handleBuyProperty(prop)}
                        >
                          {isBusy
                            ? 'Filing Deed Conveyance...'
                            : canAfford
                              ? `Acquire Deed (${currency.symbol}${prop.cost}) →`
                              : `Insufficient Funds (Need ${currency.symbol}${prop.cost})`}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Financial Actions */}
      {activeTab === 'Financial Actions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {age < 6 ? (
            <div className="ll-card" style={{ padding: 16 }}>
              <h3 className="ll-section-title">Infant Financial Actions</h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  margin: '6px 0 12px',
                }}
              >
                You are an infant. You have no coins to spend or manage!
              </p>
              <button
                type="button"
                className="ll-btn-gold"
                onClick={() => triggerAction('You played happily with your baby rattle.')}
              >
                Play with Wooden Rattle →
              </button>
            </div>
          ) : age < 14 ? (
            <div className="ll-card" style={{ padding: 16 }}>
              <h3 className="ll-section-title">Childhood Spending & Savings</h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  margin: '6px 0 14px',
                }}
              >
                Manage your pocket coins prudently.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  className="ll-btn-gold"
                  onClick={() =>
                    triggerAction('✓ Put a pocket coin into your wooden piggy box. Saved +1!')
                  }
                >
                  🪙 Save Pocket Coin in Wooden Box
                </button>
                <button
                  type="button"
                  className="ll-btn-outline"
                  onClick={() =>
                    triggerAction('🍬 Bought sweet jalebi / candy at the bazaar! Boosted happiness.')
                  }
                >
                  🍬 Buy Bazaar Sweets (-1 Coin)
                </button>
                <button
                  type="button"
                  className="ll-btn-outline"
                  onClick={() =>
                    triggerAction('📚 Purchased slate and chalk for handwriting practice.')
                  }
                >
                  📚 Buy School Slate & Chalk (-1 Coin)
                </button>
              </div>
            </div>
          ) : age < 18 ? (
            <div className="ll-card" style={{ padding: 16 }}>
              <h3 className="ll-section-title">Youth Financial Decisions</h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  margin: '6px 0 14px',
                }}
              >
                Build savings for your upcoming adulthood and guild entrance fees.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  className="ll-btn-gold"
                  onClick={() => triggerAction('✓ Saved apprentice stipend into family chest.')}
                >
                  🪙 Deposit Stipend to Savings
                </button>
                <button
                  type="button"
                  className="ll-btn-outline"
                  onClick={() => triggerAction('🔨 Purchased quality apprentice tools.')}
                >
                  🔨 Buy Craft Workshop Tools (-5 Coins)
                </button>
              </div>
            </div>
          ) : (
            <div className="ll-card" style={{ padding: 16 }}>
              <h3 className="ll-section-title">Adult Commercial Operations</h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  margin: '6px 0 14px',
                }}
              >
                Invest, borrow, or expand your commercial footprint.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  className="ll-btn-gold"
                  onClick={() =>
                    triggerAction('✓ Invested 50 coins into regional trade caravan.')
                  }
                >
                  🚢 Invest in Trading Caravan (50 Coins)
                </button>
                <button
                  type="button"
                  className="ll-btn-outline"
                  onClick={() =>
                    triggerAction('📜 Applied for municipal merchant credit facility.')
                  }
                >
                  📜 Request Bank / Moneylender Credit
                </button>
                <button
                  type="button"
                  className="ll-btn-outline"
                  onClick={() =>
                    triggerAction('🏛️ Paid annual municipal guild membership dues.')
                  }
                >
                  🏛️ Pay Guild Membership Dues (-10 Coins)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
