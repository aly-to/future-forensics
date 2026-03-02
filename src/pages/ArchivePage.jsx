import { Link } from 'react-router-dom'

export default function ArchivePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-bone flex flex-col items-center px-5 py-8 md:p-8">
      <div className="max-w-2xl text-center space-y-6 md:space-y-8 py-8 md:py-16">
        <div className="w-48 mx-auto">
          <video autoPlay loop muted playsInline className="w-full h-auto">
            <source src="/ff-logo.mp4" type="video/mp4" />
          </video>
        </div>
        <h1 className="text-xl md:text-2xl font-medium tracking-tighter">THE END OF THE WORLD</h1>
        <div className="text-base text-left space-y-6 leading-relaxed border-t border-b border-border py-8" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
          <p>
            One day, without warning or explanation, people were gone. No catastrophe, no war, no pandemic — just a quiet and
            sudden absence, as if the world blinked and most of its occupants forgot to reappear.
          </p>
          <p>
            What remained was everything else. The cities kept standing. The factories held
            their chemicals and the parking lots held their cars.
            Infrastructure ground slowly to a halt, not in crisis but in something closer to
            resignation — systems completing their last cycles, then going still.
          </p>
          <p>
            Then the earth did what it does. Moss filled the crosswalks. Water filled the
            basements, then the lobbies, then the lower floors. The steam that once heated apartments escaped through the grates
            with no one left to feel it. The world didn't end. It just continued without us, and
            it turned out to be very good at that.
          </p>
          <p>
            Future Forensics is an olfactory investigation into this quiet aftermath — a collection
            of eight atmospheric reconstructions that imagine how air, environment, and memory
            evolve in the absence of people. Each fragrance is recovered from a
            different site: the charged stillness before everything changed, overgrown cities,
            submerged coastlines, the last exhale of urban infrastructure, fossilized industry,
            synthetic warmth sealed in an abandoned car, orbital sweetness found in a forgotten
            supply depot, and the lingering trace of human skin.
          </p>
          <p>
            Future Forensics is a speculative fiction project at skin scale: eight imagined sites,
            eight different atmospheres, worn close and experienced in the space between your
            pulse points.
          </p>
        </div>
        <Link
          to="/#collection"
          className="inline-block px-8 py-3 border border-graphite text-graphite font-mono text-xs uppercase tracking-widest hover:bg-graphite hover:text-white transition-colors"
        >
          Return to Collection
        </Link>

        {/* Credits */}
        <div className="pt-16 space-y-6">
          <div className="w-32 mx-auto">
            <video autoPlay loop muted playsInline className="w-full h-auto">
              <source src="/ff-logo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="font-mono text-[10px] tracking-wider text-gray-600 uppercase space-y-2">
            <p>A speculative design project by Alyssa Tohyama</p>
            <p>Concept, copywriting, visual identity, art direction, and product design</p>
            <p>Web design created in Claude Code. Images generated with DALL-E.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
