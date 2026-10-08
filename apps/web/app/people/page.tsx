'use client';

import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import {
  formatLocationFull,
  getFamilyKinshipProfile,
  isVictorianLocation,
} from '../../lib/era';

interface Person {
  id: string;
  name: string;
  relation: string;
  category: 'Family' | 'Friends' | 'Romantic' | 'Work' | 'Others';
  age: number;
  occupation: string;
  hometown: string;
  personality: string;
  interests: string;
  bio: string;
  relationshipScore: number;
  avatarIcon: string;
}

export default function PeoplePage(): JSX.Element {
  const { view, marryPartner, haveChild } = useLife();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [viewFamilyTree, setViewFamilyTree] = useState<boolean>(false);
  const [interactionToast, setInteractionToast] = useState<string | null>(null);
  const [isMarrying, setIsMarrying] = useState<boolean>(false);
  const [isHavingChild, setIsHavingChild] = useState<boolean>(false);

  const player = view?.player;
  const playerAge = player?.age ?? 0;
  const locationRaw = player?.locationId ?? 'location.lucknow';
  const cityName = formatLocationFull(locationRaw);
  const isVictorian = isVictorianLocation(locationRaw);
  const playerSurname =
    player?.name?.split(' ').slice(1).join(' ') ||
    (isVictorian ? 'Pendelton' : 'Sharma');
  const kinship = getFamilyKinshipProfile(locationRaw, playerSurname);

  const spouseMember = view?.familyMembers.find((m) => m.relation === 'spouse' && m.alive);
  const isMarried = Boolean(spouseMember);
  const childrenMembers = view?.familyMembers.filter((m) => m.relation === 'child' && m.alive) ?? [];

  async function handleProposeMarriage(partnerName: string): Promise<void> {
    setIsMarrying(true);
    try {
      await marryPartner(partnerName);
      setInteractionToast(`💍 Congratulations! You and ${partnerName} are now happily married.`);
    } catch (err) {
      setInteractionToast(err instanceof Error ? err.message : 'Marriage proposal failed');
    } finally {
      setIsMarrying(false);
    }
  }

  async function handleHaveChild(): Promise<void> {
    setIsHavingChild(true);
    const childNames = kinship.childNamePool;
    const chosenName =
      childNames[Math.floor(Math.random() * childNames.length)]! + ' ' + playerSurname;
    try {
      await haveChild(chosenName);
      setInteractionToast(`👶 A blessed day! Welcomed your child, ${chosenName}, into the family dynasty.`);
    } catch (err) {
      setInteractionToast(err instanceof Error ? err.message : 'Could not have child');
    } finally {
      setIsHavingChild(false);
    }
  }

  // Build characters dynamically relative to player age & culture
  const fatherAge = playerAge + 28;
  const motherAge = playerAge + 25;
  const brotherAge = playerAge + 4;
  const peerAge = Math.max(1, playerAge);

  const people: Person[] = [
    {
      id: 'p1',
      name: kinship.fatherName,
      relation: 'Father',
      category: 'Family',
      age: fatherAge,
      occupation: kinship.fatherOccupation,
      hometown: cityName,
      personality: 'Hardworking, Disciplined, Protective',
      interests: isVictorian ? 'Engineering, Industry & Politics' : 'Craftsmanship, Family Welfare, Ancient Lore',
      bio: `Your father (${fatherAge} years old). A skilled and principled craftsman devoted to guiding you through a changing epoch.`,
      relationshipScore: 85,
      avatarIcon: '👨🏻‍🦳',
    },
    {
      id: 'p2',
      name: kinship.motherName,
      relation: 'Mother',
      category: 'Family',
      age: motherAge,
      occupation: kinship.motherOccupation,
      hometown: cityName,
      personality: 'Kind, Resilient, Nurturing',
      interests: 'Homemaking, Folklore, Family Health',
      bio: `Your mother (${motherAge} years old). Always vigilant over your health and education, offering warmth and wise counsel.`,
      relationshipScore: 90,
      avatarIcon: '👩🏻',
    },
    {
      id: 'p3',
      name: kinship.brotherName,
      relation: 'Elder Brother',
      category: 'Family',
      age: brotherAge,
      occupation: playerAge < 10 ? 'Student' : playerAge < 14 ? 'Senior Student' : 'Trade Apprentice',
      hometown: cityName,
      personality: 'Playful, Daring, Loyal',
      interests: 'Street Games, Markets, Explorations',
      bio: `Your elder brother, 4 years older than you. Always sharing neighborhood news and looking out for you.`,
      relationshipScore: 75,
      avatarIcon: '👦🏻',
    },
    {
      id: 'p4',
      name: kinship.peerName,
      relation: playerAge < 14 ? 'School Playmate' : playerAge < 18 ? 'Academy Classmate' : 'Close Friend',
      category: 'Friends',
      age: peerAge,
      occupation: playerAge < 14 ? 'Primary Student' : playerAge < 18 ? 'Academy Student' : 'Bookkeeper',
      hometown: cityName,
      personality: 'Curious, Gentle, Sharp-witted',
      interests: 'Literature, Music, City Walks',
      bio: `A childhood companion your own age (${peerAge} years old). You share stories, study lessons, and dream together of the future.`,
      relationshipScore: 68,
      avatarIcon: '👧🏻',
    },
  ];

  // Adolescent & Adult Contacts
  if (playerAge >= 14) {
    people.push({
      id: 'p5',
      name: kinship.mentorName,
      relation: playerAge < 18 ? 'Trade Mentor' : kinship.mentorRole,
      category: 'Work',
      age: 52,
      occupation: kinship.mentorRole,
      hometown: cityName,
      personality: 'Shrewd, Observant, Experienced',
      interests: 'Commerce, Machinery, Ledger Accounts',
      bio: 'An influential trade master who oversees operations and evaluates promising apprentices.',
      relationshipScore: 45,
      avatarIcon: '🧔🏻',
    });
  }

  if (playerAge >= 18) {
    people.push({
      id: 'p6',
      name: kinship.romanticPartnerName,
      relation: 'Courtship Prospect',
      category: 'Romantic',
      age: 20,
      occupation: isVictorian ? 'Governess of Letters' : 'Teacher of Letters',
      hometown: cityName,
      personality: 'Cultured, Thoughtful, Witty',
      interests: 'Poetry, Civic Debates, Music',
      bio: 'Introduced through family networks. A cultured and articulate soul with mutual interests.',
      relationshipScore: 50,
      avatarIcon: '👩🏻‍🦰',
    });
  }

  // If live family members are present in view, sync them in
  if (view && view.familyMembers.length > 0) {
    view.familyMembers.forEach((fm, idx) => {
      if (!people.some((p) => p.name.toLowerCase() === fm.name.toLowerCase())) {
        people.unshift({
          id: `fm-${idx}`,
          name: fm.name,
          relation: fm.relation,
          category: 'Family',
          age: 35 + idx * 3,
          occupation: 'Worker',
          hometown: cityName,
          personality: 'Supportive, Loyal',
          interests: 'Family',
          bio: `Your ${fm.relation.toLowerCase()} who stands with your household in this era.`,
          relationshipScore: 80,
          avatarIcon: '👥',
        });
      }
    });
  }

  function handleAction(actionName: string): void {
    if (!selectedPerson) return;
    setInteractionToast(
      `✓ Chose to ${actionName} with ${selectedPerson.name}. Relationship score increased!`,
    );
    selectedPerson.relationshipScore = Math.min(100, selectedPerson.relationshipScore + 3);
    setTimeout(() => setInteractionToast(null), 3500);
  }

  const filteredPeople =
    activeCategory === 'All'
      ? people
      : people.filter((p) => p.category === activeCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Toast Notification */}
      {interactionToast && (
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
          {interactionToast}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div>
          <h2>People & Relationships</h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Nurture your family, friendships, and historical social network.
          </div>
        </div>
        <button
          type="button"
          className="ll-btn-outline"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          onClick={() => setViewFamilyTree(!viewFamilyTree)}
        >
          {viewFamilyTree ? '← View Directory' : '🌳 View Family Tree'}
        </button>
      </div>

      {/* FAMILY TREE VIEW (Matches Family Tree.png) */}
      {viewFamilyTree ? (
        <div className="ll-card" style={{ padding: 18 }}>
          <h3 className="ll-section-title" style={{ textAlign: 'center', marginBottom: 14 }}>
            Family Lineage & Dynasty
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* Generation 1: Parents */}
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <div
                className="ll-card"
                style={{ padding: 12, textAlign: 'center', width: 140, background: 'var(--bg-secondary)' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>👨🏻‍🦳</div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--cream)' }}>
                  {kinship.fatherName}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Father • Age {fatherAge}</div>
                <span className="ll-pill gold" style={{ fontSize: '0.65rem', marginTop: 4 }}>
                  Patriarch
                </span>
              </div>

              <div
                className="ll-card"
                style={{ padding: 12, textAlign: 'center', width: 140, background: 'var(--bg-secondary)' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>👩🏻</div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--cream)' }}>
                  {kinship.motherName}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Mother • Age {motherAge}</div>
                <span className="ll-pill gold" style={{ fontSize: '0.65rem', marginTop: 4 }}>
                  Matriarch
                </span>
              </div>
            </div>

            {/* Tree Line Connector */}
            <div style={{ width: 2, height: 20, background: 'var(--gold-500)' }} />

            {/* Generation 2: Player, Spouse & Siblings */}
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <div
                className="ll-card ll-card-gold"
                style={{ padding: 12, textAlign: 'center', width: 140 }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>🧑🏻</div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--cream)' }}>
                  {player?.name ?? 'You'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gold-400)' }}>
                  You • Age {playerAge}
                </div>
                <span className="ll-pill positive" style={{ fontSize: '0.65rem', marginTop: 4 }}>
                  Player Protagonist
                </span>
              </div>

              {spouseMember && (
                <div
                  className="ll-card ll-card-gold"
                  style={{ padding: 12, textAlign: 'center', width: 140, background: 'rgba(230, 179, 77, 0.1)' }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>💍</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--cream)' }}>
                    {spouseMember.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gold-400)' }}>
                    Spouse • Wedded
                  </div>
                  <span className="ll-pill gold" style={{ fontSize: '0.65rem', marginTop: 4 }}>
                    Life Partner
                  </span>
                </div>
              )}

              <div
                className="ll-card"
                style={{ padding: 12, textAlign: 'center', width: 140, background: 'var(--bg-secondary)' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>👦🏻</div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--cream)' }}>
                  {kinship.brotherName}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  Brother • Age {brotherAge}
                </div>
                <span className="ll-pill neutral" style={{ fontSize: '0.65rem', marginTop: 4 }}>
                  Kin
                </span>
              </div>
            </div>

            {/* Generation 3: Children & Dynasty Heirs */}
            {childrenMembers.length > 0 && (
              <>
                <div style={{ width: 2, height: 20, background: 'var(--gold-500)' }} />
                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600 }}>
                  GENERATION 3: OFFSPRING & DYNASTY HEIRS
                </div>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {childrenMembers.map((ch, idx) => (
                    <div
                      key={`${ch.name}-${idx}`}
                      className="ll-card"
                      style={{
                        padding: 12,
                        textAlign: 'center',
                        width: 140,
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-gold)',
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>👶</div>
                      <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--cream)' }}>
                        {ch.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Child • Living Heir
                      </div>
                      <span className="ll-pill positive" style={{ fontSize: '0.65rem', marginTop: 4 }}>
                        Dynasty Heir
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Have Child Action within Family Tree */}
            {isMarried && (
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <button
                  type="button"
                  className="ll-btn-gold"
                  disabled={isHavingChild}
                  style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                  onClick={() => void handleHaveChild()}
                >
                  {isHavingChild ? 'Welcoming Newborn...' : '👶 Welcome a Child into the Family Dynasty →'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* DIRECTORY VIEW (Matches Directory.png) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Category Filter Tabs */}
          <div className="ll-filter-tabs">
            {['All', 'Family', 'Friends', 'Romantic', 'Work'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`ll-filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {cat === 'Romantic' && playerAge < 18 && ' 🔒'}
                {cat === 'Work' && playerAge < 14 && ' 🔒'}
              </button>
            ))}
          </div>

          {/* Locked Category Notices */}
          {activeCategory === 'Romantic' && playerAge < 18 && (
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
                  fontSize: '0.9rem',
                }}
              >
                <span>🔒</span> Romance & Courtship Locked (Requires Age 18+)
              </div>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                You are currently {playerAge} years old. In accordance with historical social
                structure and realism, courtship, matchmaker proposals, and marriage are reserved
                for legal adulthood (Age 18+). Focus on your childhood friendships and family
                bonds.
              </p>
            </div>
          )}

          {activeCategory === 'Work' && playerAge < 14 && (
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
                  fontSize: '0.9rem',
                }}
              >
                <span>🔒</span> Trade & Work Colleagues Locked (Requires Age 14+)
              </div>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                Young children do not have professional coworkers or guild masters. You will meet
                trade mentors and workplace peers upon starting an apprenticeship at Age 14.
              </p>
            </div>
          )}

          {/* People List Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredPeople.map((person) => (
              <div
                key={person.id}
                className="ll-card"
                style={{
                  padding: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() => setSelectedPerson(person)}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: '#1d2531',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                    }}
                  >
                    {person.avatarIcon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--cream)' }}>
                        {person.name}
                      </h4>
                      <span className="ll-pill gold" style={{ fontSize: '0.7rem' }}>
                        {person.relation}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginTop: 2,
                      }}
                    >
                      Age {person.age} • {person.occupation}
                    </div>

                    {/* Relationship bar */}
                    <div style={{ width: 140, marginTop: 6 }}>
                      <div className="ll-stat-bar-track">
                        <div
                          className="ll-stat-bar-fill"
                          style={{
                            width: `${person.relationshipScore}%`,
                            background:
                              person.relationshipScore >= 75
                                ? 'var(--green)'
                                : 'var(--gold-400)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ll-action-chev" style={{ alignSelf: 'center' }}>
                  ›
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PERSON DETAIL MODAL (Matches Person & Relationship Detail.png) */}
      {selectedPerson && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="ll-card"
            style={{
              maxWidth: 480,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Topbar of Modal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <span className="ll-pill gold">{selectedPerson.relation} Profile</span>
              <button
                type="button"
                className="ll-icon-btn"
                onClick={() => setSelectedPerson(null)}
              >
                ✕
              </button>
            </div>

            {/* Profile Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#1d2531',
                  border: '2px solid var(--gold-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
              >
                {selectedPerson.avatarIcon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--cream)' }}>
                  {selectedPerson.name}
                </h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Age {selectedPerson.age} • {selectedPerson.occupation}
                </div>
              </div>
            </div>

            {/* Relationship Progress */}
            <div
              className="ll-card"
              style={{
                padding: 12,
                marginBottom: 12,
                background: 'var(--bg-secondary)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Bond Strength</span>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--green)',
                  }}
                >
                  {selectedPerson.relationshipScore} / 100
                </span>
              </div>
              <div className="ll-stat-bar-track">
                <div
                  className="ll-stat-bar-fill"
                  style={{
                    width: `${selectedPerson.relationshipScore}%`,
                    background: 'var(--green)',
                  }}
                />
              </div>
            </div>

            {/* Details Table */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontSize: '0.85rem',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 4,
                }}
              >
                <span className="ll-muted">Hometown</span>
                <span>{selectedPerson.hometown}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 4,
                }}
              >
                <span className="ll-muted">Personality</span>
                <span>{selectedPerson.personality}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 4,
                }}
              >
                <span className="ll-muted">Interests</span>
                <span>{selectedPerson.interests}</span>
              </div>
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              {selectedPerson.bio}
            </p>

            {/* Age-Appropriate Actions Grid */}
            <h4 style={{ fontSize: '0.9rem', marginBottom: 8, color: 'var(--gold-400)' }}>
              Social Actions
            </h4>

            {playerAge < 14 ? (
              // Child Interaction Actions
              selectedPerson.category === 'Family' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('hug and seek comfort')}
                  >
                    <span>🫂</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Hug</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('ask for a bedtime story')}
                  >
                    <span>📖</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Story</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('help with household chores')}
                  >
                    <span>🧹</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Help</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('ask for pocket allowance')}
                  >
                    <span>🪙</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Allowance</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('talk about your day at school')}
                  >
                    <span>💬</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Talk</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('play marbles and kite flying')}
                  >
                    <span>🪁</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Play</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('share bazaar sweets')}
                  >
                    <span>🍬</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Sweets</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('study homework together')}
                  >
                    <span>📚</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Study</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('whisper secrets')}
                  >
                    <span>💬</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Chat</span>
                  </button>
                  <button
                    type="button"
                    className="ll-stat-card"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                    onClick={() => handleAction('explore neighborhood streets')}
                  >
                    <span>🏃</span>
                    <span style={{ fontSize: '0.7rem', marginTop: 4 }}>Explore</span>
                  </button>
                </div>
              )
            ) : (
              // Adult Interaction Actions (Matches Person & Relationship Detail.png)
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                <button
                  type="button"
                  className="ll-stat-card"
                  style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                  onClick={() => handleAction('converse')}
                >
                  <span>💬</span>
                  <span style={{ fontSize: '0.72rem', marginTop: 4 }}>Talk</span>
                </button>
                <button
                  type="button"
                  className="ll-stat-card"
                  style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                  onClick={() => handleAction('present a gift')}
                >
                  <span>🎁</span>
                  <span style={{ fontSize: '0.72rem', marginTop: 4 }}>Gift</span>
                </button>
                <button
                  type="button"
                  className="ll-stat-card"
                  style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                  onClick={() => handleAction('spend leisure time')}
                >
                  <span>👥</span>
                  <span style={{ fontSize: '0.72rem', marginTop: 4 }}>Spend Time</span>
                </button>
                <button
                  type="button"
                  className="ll-stat-card"
                  style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                  onClick={() => handleAction('seek life advice')}
                >
                  <span>📖</span>
                  <span style={{ fontSize: '0.72rem', marginTop: 4 }}>Advice</span>
                </button>
                <button
                  type="button"
                  className="ll-stat-card"
                  style={{ cursor: 'pointer', background: 'var(--bg-secondary)' }}
                  onClick={() => handleAction('keep distance')}
                >
                  <span>🚫</span>
                  <span style={{ fontSize: '0.72rem', marginTop: 4 }}>Distance</span>
                </button>
              </div>
            )}

            {/* Marriage & Childbearing Dynasty Actions */}
            {playerAge >= 18 && selectedPerson.category === 'Romantic' && !isMarried && (
              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  className="ll-btn-gold"
                  disabled={isMarrying}
                  style={{ width: '100%', padding: '10px 16px', fontSize: '0.88rem' }}
                  onClick={() => void handleProposeMarriage(selectedPerson.name)}
                >
                  {isMarrying ? 'Celebrating Wedding...' : `💍 Propose Marriage to ${selectedPerson.name} →`}
                </button>
              </div>
            )}

            {playerAge >= 18 && (selectedPerson.relation.toLowerCase().includes('spouse') || selectedPerson.name === spouseMember?.name) && (
              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  className="ll-btn-gold"
                  disabled={isHavingChild}
                  style={{ width: '100%', padding: '10px 16px', fontSize: '0.88rem' }}
                  onClick={() => void handleHaveChild()}
                >
                  {isHavingChild ? 'Welcoming Newborn...' : '👶 Welcome a Child into the Family Dynasty →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
