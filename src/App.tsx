import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import './styles.css'

type Photo = {
  id: string
  file: string
  title: string
  caption: string
  description: string
  size: 'tall' | 'wide' | 'square'
  note: string
}

const photos: Photo[] = [
  { id: '01', file: 'photo 01.jpeg', title: 'Never an optionִֶָ🦋', caption: 'You deserve to be someone’s definite yes.', description: 'You should never be an option to someone not today, not tomorrow, not ever. You deserve to be someone’s first choice: chosen wholeheartedly, loved without hesitation, and never left wondering where you stand. Never settle for being someone’s maybe when you deserve their definite yes.', size: 'tall', note: 'always the definite yes 🥹' },
  { id: '02', file: 'photo 02.jpeg', title: 'Wewe ni Kekiii😍', caption: 'You are THAT GIRL. Never stop recognising it.', description: 'I hope you never get tired of appreciating yourself. Look at yourself and see a beautiful woman who deserves the world. Celebrate your Beauty, your achievements, your personality, your little quirks, and everything that makes you you KApaint. You should never have to wait for someone else’s compliment before recognising your beauty. You are pretty, confident, appreciated, loved, and completely THAT GIRL.', size: 'wide', note: 'That girl, always❤️' },
  { id: '03', file: 'photo 03.jpeg', title: 'A diamond, always💎', caption: 'You are a rare and beautiful gem.🤍', description: 'You are diamonds and Rubies. You are precious, brilliant, and deserving of beautiful things. Never lower your standards just to fit into someone’s life, and never feel the need to prove your brilliance to people who cannot recognise it. Carry yourself like the rare beauty you are. Umeskiaaaaa????', size: 'square', note: 'rare, pretty, unmistakable' },
  { id: '04', file: 'photo 04.png', title: 'You are enough🤍', caption: 'Never let anyone make you question your place in the world.', description: 'Please never question whether you are enough. You are enough, even on the days when you do not feel like it. You are deserving of love, respect, happiness, and every beautiful thing life has to offer. Do not let one person’s inability to love you properly convince you that you are difficult to love. The right people will never make you regret being the beautiful person you are.', size: 'square', note: 'You are Amazinggg🤍' },
  { id: '05', file: 'photo 05.jpeg', title: 'To be Handled with care🦋', caption: 'Your beautiful heart deserves gentleness.', description: 'You have a heart that deserves gentleness, patience, honesty, and genuine affection. You deserve someone who understands the importance of being careful with your feelings and never treats your vulnerability as a weakness. Someone who listens, reassures you, and makes an effort to understand you. You deserve to feel emotionally safe, appreciated, and loved. Never be ashamed of having and never hide such a beautiful, loving heart❤️', size: 'tall', note: 'You deserve all beautiful things🤍' },
  { id: '06', file: 'photo 06.jpg', title: 'You desere the best of the best🤍', caption: 'Never feel guilty for wanting the best.', description: 'Kapaint, you deserve the best of the best; not half-hearted efforts, inconsistent affection, empty promises, or the bare minimum. You deserve beautiful experiences, genuine friendships and a love that appreciates you every single day. Never feel guilty for wanting a life that cherishes you properly.', size: 'wide', note: 'Not the bare minimum, not almost,not halfway.THE BEST.🤍' },
  { id: '07', file: 'photo 07.jpg', title: 'You deserve someone who sees your worth🩶', caption: 'You deserve love without negotiating for the bare minimum.', description: 'May you never have to beg someone to call you, check up on you, make time for you, or show you that they care. May you experience a love where effort is mutual, communication is natural, and affection is freely expressed. You deserve actions that consistently reassure you,never confusion, never bargaining, never negotiating', size: 'wide', note: 'You deserve the best kind of love🖤' },
  { id: '08', file: 'photo 08.png', title: 'Never forget your light🤍', caption: 'Being you is already something worth celebrating🦋.', description: 'I hope you see yourself the way the people who genuinely appreciate you see you. Recognise your beauty, your strength, your kindness, and everything that makes you Kawaruu🤍. Never settle for people that make you feel small when you deserve to feel celebrated. Above all, I hope you meet people who remind you that being you is already something worth appreciating. Never forget your value, msupa❤️.', size: 'tall', note: 'We ni Mrembo woii❤️' },
  { id: '09', file: 'photo 09.jpg', title: 'You are a really really Lovely Person❤️', caption: 'An absolute marvel', description: 'Ruth, you are very, very pretty; beautiful in all the ways a mirror cannot show. You are such a sweet, wonderful human being, and everything about you is so beautiful. You are an absolute marvel: strong, kind, intelligent, elegant, and completely yourself. Never let anyone make you feel ordinary when you are this special. No crumbs, no leftovers, no bare minimum the whole cake, please. You deserve every beautiful thing life has to offer❤️', size: 'square', note: 'An Absolute Marvel You aree ❤️' },
]

const letterLines = [
  'Msupa,',
  'If you ever forget how loved you are,',
  'come back to this little page.',
  'It holds the little things I hope',
  'you never forget about yourself:',
  'your soft heart, your brave spirit,',
  'your pretty laugh, your subtle elegance',
  'your beautiful way of becoming.',
  'I hope 19 will be gentle with you,',
  'and generous with all your dreams.',
  'The world is kinder because you are in it.',
  'Happy birthday Ruth Wangui🤍',
]

const letterCharSpeed = 0.019
const letterPause = 0.16
const letterDelays = letterLines.reduce<number[]>((delays, line, index) => {
  const previous = index === 0 ? 0 : delays[index - 1] + letterLines[index - 1].length * letterCharSpeed + letterPause
  delays.push(previous)
  return delays
}, [])
const letterSignatureDelay = letterDelays[letterDelays.length - 1] + letterLines[letterLines.length - 1].length * letterCharSpeed + .28

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon icon-arrow"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon"><path d="m6 6 12 12M18 6 6 18" /></svg>
}

function HeartIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="heart-icon"><path d="M12 20.2S4.5 15.7 4.5 10.2A4.1 4.1 0 0 1 12 7.8a4.1 4.1 0 0 1 7.5 2.4c0 5.5-7.5 10-7.5 10Z" /></svg>
}

function Sparkle({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 40 40" className={`sparkle ${className}`}><path d="M20 1c1.2 11.7 7.3 17.8 19 19-11.7 1.2-17.8 7.3-19 19-1.2-11.7-7.3-17.8-19-19 11.7-1.2 17.8-7.3 19-19Z" /></svg>
}

function TypewriterLine({ text, delay }: { text: string; delay: number }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setVisibleCount((count) => {
          if (count >= text.length) {
            if (interval) window.clearInterval(interval)
            return count
          }
          return count + 1
        })
      }, letterCharSpeed * 1000)
    }, delay * 1000)

    return () => {
      window.clearTimeout(start)
      if (interval) window.clearInterval(interval)
    }
  }, [delay, text])

  const visibleText = Array.from(text.slice(0, visibleCount))

  return (
    <span className={`type-line ${visibleCount > 0 && visibleCount < text.length ? 'is-typing' : ''}`} aria-label={text}>
      {visibleText.map((character, index) => (
        <span className={`type-char ${index === visibleText.length - 1 ? 'type-char-new' : ''}`} aria-hidden="true" key={`${text}-${index}`}>{character === ' ' ? '\u00a0' : character}</span>
      ))}
      <span className="type-caret" aria-hidden="true" />
    </span>
  )
}

function PhotoVisual({ src, alt, label, note, size }: { src: string; alt: string; label: string; note: string; size: Photo['size'] }) {
  const [missing, setMissing] = useState(false)

  return (
    <div className={`photo-visual photo-visual-${size}`}>
      {missing ? (
        <div className="photo-placeholder" role="img" aria-label={`${alt}. Add ${label} to the photos folder.`}>
          <span className="placeholder-star"><Sparkle /></span>
          <span className="placeholder-number">{label}</span>
          <span className="placeholder-note">{note}</span>
        </div>
      ) : (
        <img src={encodeURI(src)} alt={alt} loading="lazy" onError={() => setMissing(true)} />
      )}
      <span className="photo-wash" aria-hidden="true" />
    </div>
  )
}

function App() {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null)
  const [lightCycle, setLightCycle] = useState(0)
  const [letterCycle, setLetterCycle] = useState(0)
  const [galleryRevealed, setGalleryRevealed] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const [introLeaving, setIntroLeaving] = useState(false)
  const [introCardFlipped, setIntroCardFlipped] = useState(false)
  const [celebrationActive, setCelebrationActive] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = activePhoto || introVisible ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activePhoto, introVisible])

  const scrollToJourney = () => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })
  const enterSite = () => {
    if (introLeaving) return
    setIntroLeaving(true)
    setCelebrationActive(true)
    window.setTimeout(() => setIntroVisible(false), 1900)
    window.setTimeout(() => setCelebrationActive(false), 6200)
  }
  const flipIntroCard = () => setIntroCardFlipped((flipped) => !flipped)
  const handleIntroCardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      flipIntroCard()
    }
  }

  return (
    <main>
      {celebrationActive && (
        <div className="entry-celebration" aria-hidden="true">
          <div className="entry-balloons">
            <span className="entry-balloon entry-balloon-one" />
            <span className="entry-balloon entry-balloon-two" />
            <span className="entry-balloon entry-balloon-three" />
          </div>
          <div className="entry-confetti">
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
        </div>
      )}
      {introVisible && (
        <section className={`intro-cover ${introLeaving ? 'is-leaving' : ''}`} aria-labelledby="intro-title" aria-hidden={introLeaving}>
          <img className="intro-cover-photo" src="/photos/photo%2008.png"/>
          <div className="intro-cover-shade" aria-hidden="true" />
          <div className="intro-cover-hearts" aria-hidden="true">
            <span>♡</span><span>♥</span><span>♡</span><span>♡</span><span>♥</span><span>♡</span><span>♥</span><span>♡</span><span>♡</span>
          </div>
          <div className="intro-cover-sparkles" aria-hidden="true">
            <span>✦</span><span>·</span><span>✧</span><span>·</span><span>✦</span><span>✧</span><span>·</span><span>✦</span>
          </div>
          <div className="intro-cover-inner">
            <div className={`intro-cover-copy ${introCardFlipped ? 'is-flipped' : ''}`} role="button" tabIndex={0} aria-label={introCardFlipped ? 'Birthday surprise revealed. Click to turn the card back.' : 'Birthday card. Click to reveal a surprise.'} onClick={(event) => { if (!(event.target as HTMLElement).closest('button')) flipIntroCard() }} onKeyDown={handleIntroCardKeyDown}>
              <div className="intro-cover-card-inner">
                <div className="intro-cover-card-face intro-cover-card-front">
                  <h1 id="intro-title">Hiiii<br /><em>Karangiii🤍</em></h1>
                  <p className="intro-cover-lede">You're 19🤭 Waah aki we ni kadogoo😂😂 </p>
                  <p className="intro-cover-sublede">❤️❤️❤️</p>
                </div>
                <div className="intro-cover-card-face intro-cover-card-back" aria-hidden={!introCardFlipped}>
                  <div className="intro-cover-surprise-mark" aria-hidden="true">✦</div>
                  <h2>A small little<br /><em>world for you.</em></h2>
                  <p className="intro-cover-poem">May the mornings always find you gently,<br />may the good things stay,<br />may every room you enter<br /> always remember your light❤️</p>
                  <div className="intro-cover-back-signoff">Happy Birthday<HeartIcon /></div>
                  <button className="intro-cover-button" onClick={enterSite} disabled={introLeaving}>
                    <span className="intro-cover-button-label">Ingia huku nikuwish vizuri😂</span>
                    <span className="intro-cover-button-piece" aria-hidden="true">♞</span>
                    <span className="button-arrow"><ArrowIcon /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="chess-atmosphere" aria-hidden="true">
        <span className="chess-piece chess-piece-knight">♞</span>
        <span className="chess-piece chess-piece-bishop">♝</span>
        <span className="chess-piece chess-piece-rook">♜</span>
        <span className="chess-piece chess-piece-pawn">♟</span>
        <span className="chess-piece chess-piece-queen">♛</span>
        <span className="chess-piece chess-piece-knight chess-piece-knight-two">♞</span>
      </div>
      <nav className="topbar" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Morning star home">
          <span className="wordmark-mark"><Sparkle /></span>
          <span>K.Wangui🤍</span>
        </a>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-stars" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        <div className="hero-horizon" aria-hidden="true" />
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title fade-in-up delay-1">Happy Happyyy Birthdayyyy<br /><em>Kawaruuuuuuuuu❤️</em></h1>
          <p className="hero-lede fade-in-up delay-2"><HeartIcon /></p>
        </div>

        <div className="concert-beam" aria-hidden="true" />
        <div className="hero-portrait-wrap fade-in-up delay-2" key={lightCycle}>
          <div className="portrait-orbit orbit-one" aria-hidden="true" />
          <div className="portrait-orbit orbit-two" aria-hidden="true" />
          <div className="hero-portrait">
            <div className="spotlight" aria-hidden="true" />
            <PhotoVisual src="/photos/welcome.jpeg" alt="A portrait waiting for your favourite photo" label="welcome" note="your first light" size="tall" />
          </div>
          <Sparkle className="hero-sparkle" />
        </div>
      </section>

      <section className="journey-intro first-light-rebrand section-shell" id="journey" aria-labelledby="journey-title">
        <div className="journey-intro-bg" aria-hidden="true"><img src="/photos/photo%2009.jpg" alt="" /></div>
        <div className="journey-intro-glow" aria-hidden="true" />
        <div className="journey-intro-grid">
          <div>
            <h2 id="journey-title">You are the kind<br /><em> of amazing people remember.</em></h2>
            <p className="journey-lede">Not because you ask to be noticed, but because your presence and that smile brightens the room🤍</p>
          </div>
          <div className="journey-copy"><p>There is something quietly extraordinary about you, about the way you care, about the way you love, about how you carry a light that never needs to announce itself to be felt. That laugh is just pure magic! 🥹❤️</p><p className="signature">you are something rare <HeartIcon /></p></div>
        </div>
        <div className="journey-keepsake">
          <p>You are a Rare Gem❤️</p>
          <span className="journey-keepsake-signoff">remember this about yourself always <HeartIcon /></span>
        </div>
      </section>

      <section className="gallery-section section-shell" aria-labelledby="gallery-title">
        <div className="gallery-photo-backdrop" aria-hidden="true"><img src="/photos/photo%2004.png" alt="" /></div>
        <div className="gallery-heading">
          <div className="gallery-heading-main"><div className="section-kicker"></div><h2 id="gallery-title">Here are Our Nine little<br /><em>Commandments😂</em></h2></div>
        </div>
        <div className={`gallery-opening ${galleryRevealed ? 'is-open' : ''}`}>
          <div className="gallery-opening-tape" aria-hidden="true" />
          <h3>Some pictures are too lovely<br /><em>to keep to yourself.</em></h3>
          <p>Open this little collection slowly.<br />I hope you remind yourself of each and every one of them everyday.</p>
          <button className="gallery-open-button" onClick={() => setGalleryRevealed(true)} aria-expanded={galleryRevealed}><span>We ni wa maana sana<span>♥</span></span><ArrowIcon /></button>
          <span className="gallery-opening-handnote"><span>♥</span><span>♥</span></span>
        </div>
        <div className={`gallery-heart-burst ${galleryRevealed ? 'is-active' : ''}`} aria-hidden="true"><span>♡</span><span>♥</span><span>♡</span><span>♥</span><span>♡</span></div>
        <div className={`photo-grid ${galleryRevealed ? 'is-revealed' : ''}`}>
          {photos.map((photo, index) => (
            <button key={photo.id} className={`photo-card card-${index + 1}`} onClick={() => setActivePhoto(photo)} aria-label={`Open ${photo.file}, ${photo.caption}`}>
              <PhotoVisual src={`/photos/${photo.file}`} alt={`${photo.file}: ${photo.description}`} label={`photo ${photo.id}`} note={photo.note} size={photo.size} />
              <span className="photo-card-meta"><span className="photo-card-number">{photo.id}</span><span className="photo-card-title">{photo.title}</span></span>
              <span className="photo-card-caption">{photo.caption}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="letter-section section-shell" aria-labelledby="letter-title">
        <div className="letter-heading">
          <button className="letter-replay" onClick={() => setLetterCycle((cycle) => cycle + 1)}><span className="replay-light-dot" /> read it again</button>
        </div>
        <div className="letter-paper">
          <div className="letter-paper-top"><span>DEAR YOU</span></div>
          <h2 id="letter-title">A little note,<br /><em>just because.</em></h2>
          <div className="letter-body" key={letterCycle} aria-live="polite">
            {letterLines.map((line, index) => <TypewriterLine key={`${letterCycle}-${line}`} text={line} delay={letterDelays[index]} />)}
          </div>
          <div className="letter-signature" style={{ animationDelay: `${letterSignatureDelay}s` }}>Unapendwa❤️</div>
          <span className="letter-paper-mark" aria-hidden="true">♡</span>
          <span className="letter-chess-mark" aria-hidden="true">♞</span>
        </div>
      </section>

      <section className="closing section-shell" aria-labelledby="closing-title">
        <div className="closing-sun" aria-hidden="true" /><Sparkle className="closing-sparkle closing-sparkle-one" /><Sparkle className="closing-sparkle closing-sparkle-two" />
        <h2 id="closing-title">Keep going<br /><em>toward the light.</em></h2>
        <p>Happy birthday to the person who makes being here feel like a gift. May this next year carry joy, Bring you the peace you desire, See you thrive and fulfill your dreams, fill your heart with happiness, give you all you desire and bring you closer to the person you are meant to be. Nakupenda🖤</p>
        <div className="closing-signoff">always rooting for you❤️</div>
        <div className="closing-line" aria-hidden="true" /><div className="closing-foot">YOU ARE AMAZING🖤</div>
      </section>

      {activePhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close lightbox-close-reveal" onClick={() => setActivePhoto(null)} aria-label="Close photo viewer"><CloseIcon /></button>
            <div className="lightbox-image lightbox-image-reveal" data-frame={activePhoto.id}>
              <span className="film-sprockets film-sprockets-left" aria-hidden="true" />
              <span className="film-sprockets film-sprockets-right" aria-hidden="true" />
              <PhotoVisual src={`/photos/${activePhoto.file}`} alt={`${activePhoto.file}: ${activePhoto.description}`} label={`photo ${activePhoto.id}`} note={activePhoto.note} size={activePhoto.size} />
              <span className="film-hand-note" aria-hidden="true">{activePhoto.note}</span>
            </div>
            <div className="lightbox-copy lightbox-copy-reveal"><h2 id="lightbox-title">{activePhoto.caption}</h2><p>{activePhoto.description}</p><span className="lightbox-hand-note">kept because this feels like you.</span></div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
