import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, BookOpen, Calculator, Camera, Check, ChevronRight,
  CircleDollarSign, Clock3, Eye, Flag, Heart, Home, KeyRound, Laptop,
  LockKeyhole, Menu, PackageCheck, QrCode, Search, ShieldCheck, SlidersHorizontal,
  Sparkles, UserRoundCheck, Users, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/swap-logo-horizontal.jpeg.asset.json";
import roundLogo from "@/assets/swap-logo-round.jpeg.asset.json";
import heroArt from "@/assets/swap-hero.jpg";
import residencyArt from "@/assets/swap-residency.jpg";
import servicesArt from "@/assets/swap-services.jpg";
import lostArt from "@/assets/swap-lost-found.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SWAP — Buy. Sell. Repeat. On Campus." },
      { name: "description", content: "Buy and sell second-hand products within your campus community with privacy, mediated payments, and verified handovers." },
      { property: "og:title", content: "SWAP — Buy. Sell. Repeat. On Campus." },
      { property: "og:description", content: "The campus-centric marketplace for goods, services, rooms, and lost belongings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  ["Marketplace", "marketplace"], ["Residency", "residency"], ["Services", "services"],
  ["Lost & Found", "lost-found"], ["How It Works", "how-it-works"],
];

const products = [
  { name: "Engineering Calculator", price: "₹650", condition: "Good", icon: Calculator, cat: "Calculators", tone: "pink" },
  { name: "Data Structures Book", price: "₹300", condition: "Used", icon: BookOpen, cat: "Books", tone: "lavender" },
  { name: "Wireless Headphones", price: "₹900", condition: "Like new", icon: Zap, cat: "Electronics", tone: "cream" },
  { name: "Handmade Tote Bag", price: "₹450", condition: "New", icon: Sparkles, cat: "Creative", tone: "pink" },
  { name: "Arduino Starter Kit", price: "₹1,200", condition: "Good", icon: Laptop, cat: "Electronics", tone: "lavender" },
  { name: "Design Notes Bundle", price: "₹250", condition: "Used", icon: BookOpen, cat: "Study Materials", tone: "cream" },
];

const buyerSteps = ["Create account", "Browse campus listings", "Choose product", "Pay through SWAP", "Seller details available", "Meet for handover", "Show verification code", "Seller verifies", "Transaction completed"];
const sellerSteps = ["List product", "Review", "Published", "Buyer purchase", "Payment confirmation", "Handover", "Verification", "Funds released"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function SectionLabel({ children, index }: { children: React.ReactNode; index: string }) {
  return <div className="section-label"><span>{index}</span>{children}</div>;
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [journey, setJourney] = useState<"buyer" | "seller">("buyer");
  const [activeStep, setActiveStep] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const currentSteps = journey === "buyer" ? buyerSteps : sellerSteps;
  const visibleProducts = category === "All" ? products : products.filter((p) => p.cat === category);

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
        <a href="#top" className="brand" aria-label="SWAP home"><img src={logo.url} alt="SWAP — Buy. Sell. Repeat." /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
          <Button onClick={() => scrollTo("marketplace")}>Get Started <ArrowRight /></Button>
          <Button variant="outline" size="icon" className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="mobile-nav">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowRight /></a>)}</nav>}
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="decor-block decor-lavender" aria-hidden="true" />
          <div className="decor-block decor-pink" aria-hidden="true" />
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="live-dot" /> Your campus marketplace</div>
            <h1><span>BUY SECOND-HAND.</span><span>SELL SMART.</span><span className="outline-text">STAY ON CAMPUS.</span></h1>
            <p>SWAP brings campus buying, selling, services, accommodation and lost & found into one trusted student ecosystem.</p>
            <div className="hero-actions">
              <Button size="lg" onClick={() => scrollTo("marketplace")}>Explore Marketplace <ArrowRight /></Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("sell")}>Start Selling</Button>
            </div>
            <div className="trust-note"><ShieldCheck /> Built for student-to-student commerce.</div>
          </div>
          <div className="hero-visual reveal">
            <div className="image-frame hero-image-frame"><img src={heroArt} alt="Illustrated campus marketplace with books, laptop, calculator, headphones, backpack, and verification card" width={1536} height={1024} /></div>
            <div className="floating-tag tag-one"><QrCode /> Verified handover</div>
            <div className="floating-tag tag-two"><LockKeyhole /> Private by design</div>
            <div className="hero-stamp"><img src={roundLogo.url} alt="SWAP" /></div>
          </div>
        </section>

        <div className="trust-strip" aria-label="SWAP principles">
          {["Second-hand marketplace", "Private by design", "Verified handover", "Campus focused"].map((item) => <span key={item}><Sparkles />{item}</span>)}
        </div>

        <section className="problem section-pad reveal">
          <SectionLabel index="01">The problem</SectionLabel>
          <div className="section-heading-row"><h2>CAMPUS COMMERCE<br />SHOULD BE EASIER.</h2><p>Student deals deserve more structure than disappearing messages, unclear handovers and scattered notice boards.</p></div>
          <div className="problem-grid">
            {[
              ["01", "MESSY CHAT GROUPS", "Listings disappear as new messages push them away."],
              ["02", "NO TRUST LAYER", "There is often no structured way to protect the transaction or verify handover."],
              ["03", "NO DEDICATED CAMPUS MARKET", "Books, electronics and essentials are scattered across informal channels."],
            ].map(([num, title, copy], i) => <article className={`brutal-card problem-card tone-${i}`} key={title}><strong>{num}</strong><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="organize-demo">
            <div className="chat-chaos" aria-label="Disorganized chat listings">
              <div>Anyone selling a calculator?</div><div>DM me!</div><div>Book still available?</div><div>Price?</div>
            </div>
            <ArrowRight className="organize-arrow" />
            <div className="organized-card"><span>CALCULATORS</span><Calculator /><strong>12 campus listings</strong><small>Filtered · reviewed · structured</small></div>
          </div>
        </section>

        <section className="value section-pad reveal">
          <SectionLabel index="02">A better flow</SectionLabel>
          <div className="section-heading-row"><h2>FROM INFORMAL DEALS TO<br />STRUCTURED CAMPUS COMMERCE.</h2><p>Listings are reviewed, early-stage identities are protected, payments move through the platform, and physical handover can be verified.</p></div>
          <div className="flow-rail">
            {["List", "Discover", "Purchase", "Payment confirmed", "Identity revealed", "Meet", "QR verify", "Complete"].map((step, i) => <div className="flow-item" key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong>{i < 7 && <ArrowRight />}</div>)}
          </div>
        </section>

        <section className="trust section-pad reveal" id="safety">
          <SectionLabel index="03">Trust architecture</SectionLabel>
          <div className="section-heading-row"><h2>TRUST IS PART<br />OF THE PRODUCT.</h2><p>SWAP doesn’t just help students discover products. It structures the transaction.</p></div>
          <div className="trust-layout">
            <div className="trust-mechanisms">
              {[
                ["01", "ANONYMOUS IDENTITY", "Buyer and seller identities remain hidden from one another during the initial marketplace and purchasing stages.", LockKeyhole],
                ["02", "PLATFORM-MEDIATED PAYMENT", "The buyer pays through the platform flow. The transaction amount is controlled until the required completion step.", CircleDollarSign],
                ["03", "QR / CODE VERIFICATION", "The seller verifies the buyer’s unique code during physical handover, marking that step as complete.", QrCode],
              ].map(([num, title, copy, Icon]) => { const TrustIcon = Icon as typeof LockKeyhole; return <article className="trust-row" key={title as string}><div className="trust-icon"><TrustIcon /></div><div><span>{num as string}</span><h3>{title as string}</h3><p>{copy as string}</p></div></article>; })}
            </div>
            <div className="trust-diagram">
              <div className="person-node"><Users /> BUYER</div><ArrowDown />
              <div className="platform-node"><img src={roundLogo.url} alt="SWAP platform" /><span>PLATFORM</span></div><ArrowDown />
              <div className="person-node"><UserRoundCheck /> SELLER</div>
              <div className="qr-ticket"><div className="qr-heading"><div><small>ORDER</small><strong>#SWP-2048</strong></div><span>VERIFICATION READY</span></div><div className="qr-grid" aria-label="Simulated QR verification code">{Array.from({ length: 49 }).map((_, i) => <i key={i} className={(i * 7 + i * i) % 5 < 2 ? "filled" : ""} />)}<b /></div><small>Structured handover verification</small></div>
            </div>
          </div>
          <div className="responsible-strip"><span>Designed to reduce transaction risk.</span><span>Privacy-first transaction flow.</span><span>Not a guarantee against fraud.</span></div>
        </section>

        <section className="how section-pad reveal" id="how-it-works">
          <SectionLabel index="04">How it works</SectionLabel>
          <div className="how-header"><h2>ONE TRANSACTION.<br />CLEAR NEXT STEPS.</h2><div className="segmented"><Button variant={journey === "buyer" ? "default" : "outline"} onClick={() => { setJourney("buyer"); setActiveStep(0); }}>Buyer journey</Button><Button variant={journey === "seller" ? "default" : "outline"} onClick={() => { setJourney("seller"); setActiveStep(0); }}>Seller journey</Button></div></div>
          <div className="steps-list">{currentSteps.map((step, i) => <Button variant="ghost" key={step} className={`step-row ${activeStep === i ? "active" : ""}`} onClick={() => setActiveStep(i)}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong>{activeStep === i && <p>{journey === "buyer" ? "Your progress stays clear from campus discovery to confirmed handover." : "Follow the listing from review through verified handover and the platform transaction flow."}</p>}<ChevronRight /></Button>)}</div>
        </section>

        <section className="marketplace section-pad reveal" id="marketplace">
          <SectionLabel index="05">Marketplace</SectionLabel>
          <div className="section-heading-row"><h2>EVERYDAY STUDENT GOODS.<br />ONE CAMPUS MARKETPLACE.</h2><p>Buy useful things at student-friendly prices. Sell what you no longer need. Creative products belong here too.</p></div>
          <div className="market-toolbar"><div className="search-box"><Search /><span>Search campus listings</span></div><Button variant="outline"><SlidersHorizontal /> Filters</Button></div>
          <div className="category-rail">{["All", "Books", "Calculators", "Electronics", "Study Materials", "Creative"].map((cat) => <Button key={cat} variant={category === cat ? "default" : "outline"} size="sm" onClick={() => setCategory(cat)}>{cat}</Button>)}</div>
          <div className="product-grid">{visibleProducts.map(({ name, price, condition, icon: Icon, tone }) => <article className="product-card" key={name}><div className={`product-visual product-${tone}`}><Icon /><Button variant="outline" size="icon" aria-label={`Save ${name}`} onClick={() => setLiked((old) => old.includes(name) ? old.filter((x) => x !== name) : [...old, name])}><Heart className={liked.includes(name) ? "heart-filled" : ""} /></Button><span>{condition}</span></div><div className="product-info"><small>Example listing</small><h3>{name}</h3><strong>{price}</strong><Button variant="ghost" size="sm">Quick preview <Eye /></Button></div></article>)}</div>
          {visibleProducts.length === 0 && <div className="empty-state">More categories appear in the full marketplace.</div>}
        </section>

        <section className="sell section-pad reveal" id="sell">
          <div className="sell-copy"><SectionLabel index="06">Sell + earn</SectionLabel><h2>YOUR UNUSED STUFF CAN BECOME SOMEONE ELSE’S NEXT ESSENTIAL.</h2><p>Sell products you no longer need — and give other students access to useful items at a lower cost.</p><div className="check-grid">{["Upload photos", "Add condition", "Set price", "Submit listing", "Listing review", "Get discovered", "Verified handover", "Track earnings"].map((x) => <span key={x}><Check />{x}</span>)}</div><Button size="lg">List an item <ArrowRight /></Button></div>
          <div className="dashboard-card"><div className="dashboard-top"><strong>SELLER DASHBOARD</strong><span>Example dashboard</span></div><div className="stats-grid"><div><small>Active listings</small><b>3</b></div><div><small>Items sold</small><b>8</b></div><div className="earnings"><small>Earnings</small><b>₹12,450</b></div></div><div className="mini-list"><span><BookOpen /> Textbook set <b>Listed</b></span><span><Calculator /> Scientific calculator <b>In review</b></span><span><Laptop /> Laptop stand <b>Sold</b></span></div></div>
        </section>

        <section className="services section-pad reveal" id="services">
          <div className="feature-art"><img src={servicesArt} alt="Creative student tools including camera, drawing tablet, robot and editing interface" width={1280} height={960} loading="lazy" /></div>
          <div className="feature-copy"><SectionLabel index="07">Student services</SectionLabel><h2>YOUR SKILLS CAN BE PRODUCTS TOO.</h2><p>Offer useful services to your campus community and build practical experience. Learn. Help. Earn.</p><div className="service-list">{[["UI/UX Design", "Portfolio · Project pricing"], ["Video Editing", "Online · Per video"], ["IoT Project Help", "Offline · Per session"], ["Maths Tutoring", "Online / Offline · Hourly"]].map(([name, meta]) => <article key={name}><span>{name}</span><small>{meta}</small><ArrowRight /></article>)}</div><p className="fine-print">Example services. Income is not guaranteed.</p></div>
        </section>

        <section className="residency section-pad reveal" id="residency">
          <div className="residency-head"><SectionLabel index="08">Residency</SectionLabel><h2>NEW CAMPUS. NEW CITY.<br />NEED A ROOM?</h2><p>Discover administrator-managed accommodation opportunities near your college, sourced from vetted brokers or student networks.</p></div>
          <div className="residency-layout"><div className="feature-art"><img src={residencyArt} alt="Apartment model, keys, floor plan and rent card" width={1280} height={960} loading="lazy" /></div><div className="room-panel"><div className="filter-row">{["Area", "Rent", "Beds", "BHK"].map((x) => <span key={x}>{x}<ChevronRight /></span>)}</div><article className="room-card"><div><small>Example listing</small><h3>2 BHK Shared Apartment</h3><p><Home /> 0.8 km from campus</p></div><strong>₹7,500 <small>/ person</small></strong><div className="room-tags"><span>1 bed available</span><span>Fully furnished</span><span>Security</span></div></article><article className="roommate-card"><Users /><div><strong>NEED ONE MORE ROOMMATE?</strong><p>3 students confirmed · Looking for 1 roommate</p></div></article><Button size="lg">Find a Room <KeyRound /></Button><p className="fine-print">SWAP may earn a commission on completed residency arrangements. Listings are subject to verification; SWAP does not operate every property.</p></div></div>
        </section>

        <section className="lost section-pad reveal" id="lost-found">
          <div className="lost-copy"><SectionLabel index="09">Lost & found</SectionLabel><h2>LOST SOMETHING?<br />DON’T LOSE HOPE.</h2><p>Students can post found items. Owners make a claim with reasonable proof such as older photos, identifying marks or a receipt for higher-value items.</p><h3>MAKE IT WORTH FINDING.</h3><p>Attach a bounty to an important lost item. Claims remain subject to verification, and recovery is not guaranteed.</p><div className="notification"><span>Someone may have found your item.</span><small>Check the possible match</small></div></div>
          <div className="lost-visual"><div className="feature-art"><img src={lostArt} alt="Lost black backpack, keys, earbuds and claim card" width={1280} height={960} loading="lazy" /></div><div className="bounty-card"><span>LOST ITEM</span><strong>Black Backpack</strong><div><span>BOUNTY</span><b>₹500</b></div><small>STATUS · SEARCH ACTIVE</small></div></div>
        </section>

        <section className="ecosystem section-pad reveal">
          <SectionLabel index="10">The ecosystem</SectionLabel><h2>ONE CAMPUS.<br />MANY NEEDS.</h2>
          <div className="ecosystem-map"><div className="ecosystem-center"><img src={roundLogo.url} alt="SWAP" /></div>{[["Marketplace", "Buy & Sell", PackageCheck], ["Residency", "Rooms & Roommates", Home], ["Services", "Student Skills", Sparkles], ["Lost & Found", "Recover What Matters", Search]].map(([title, sub, Icon], i) => { const EcoIcon = Icon as typeof Home; return <article className={`eco eco-${i}`} key={title as string}><EcoIcon /><strong>{title as string}</strong><span>{sub as string}</span></article>; })}</div>
        </section>

        <section className="privacy section-pad reveal" id="privacy"><div><SectionLabel index="11">Privacy</SectionLabel><h2>YOUR IDENTITY<br />ISN’T THE PRODUCT.</h2><p>Buyers and sellers do not need to publicly expose their personal identity while browsing or purchasing. Identity disclosure occurs only when the transaction reaches the required stage.</p><span className="privacy-note">Privacy-first, not absolute anonymity.</span></div><div className="lock-visual"><div className="lock-ring"><LockKeyhole /></div><strong>PRIVATE</strong><span>UNTIL NEEDED</span></div></section>

        <section className="admin section-pad reveal">
          <div className="admin-copy"><SectionLabel index="12">Accountability</SectionLabel><h2>STRUCTURED FOR ACCOUNTABILITY.</h2><p>Administrators can review listings, manage users, monitor transaction status, investigate reports and handle disputes.</p><div className="admin-tags">{["Users", "Listings", "Pending approvals", "Transactions", "Reports", "Payment status", "Verification status", "Disputes"].map((x) => <span key={x}>{x}</span>)}</div></div>
          <div className="moderation-card"><div className="mod-head"><span><Flag /> MODERATION QUEUE</span><b>01 pending</b></div><div className="flag-item"><div className="flag-preview"><PackageCheck /></div><div><small>Listing flagged</small><h3>Potentially misleading product details</h3><p>Compare the photos, condition and description before taking action.</p></div></div><div className="mod-actions"><Button variant="outline">Review</Button><Button>Approve</Button><Button variant="outline">Reject</Button></div></div>
        </section>

        <section className="final-cta section-pad reveal"><div className="final-logo"><img src={logo.url} alt="SWAP — Buy. Sell. Repeat." /></div><h2>BUILT FOR THE WAY<br />STUDENTS ACTUALLY LIVE.</h2><p>Buy what you need. Sell what you no longer need.<br />Find your next room. Turn your skills into opportunities.<br />Recover what matters.</p><div className="hero-actions"><Button size="lg" onClick={() => scrollTo("marketplace")}>Get started with SWAP <ArrowRight /></Button><Button size="lg" variant="outline" onClick={() => scrollTo("marketplace")}>Explore the marketplace</Button></div></section>
      </main>

      <footer><div className="footer-top"><img src={logo.url} alt="SWAP" /><p>A campus-centric marketplace designed for more structured, private student commerce.</p></div><div className="footer-links">{[...navItems.map((x) => x[0]), "Safety", "Privacy", "Terms", "Contact"].map((x) => <a href={x === "Safety" ? "#safety" : x === "Privacy" ? "#privacy" : "#top"} key={x}>{x}</a>)}</div><div className="footer-bottom"><span>© 2026 SWAP</span><span>BUY. SELL. REPEAT.</span><span>Made for campus life.</span></div></footer>
    </div>
  );
}