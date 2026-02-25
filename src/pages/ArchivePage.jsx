import { Link } from 'react-router-dom'

export default function ArchivePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-bone flex flex-col items-center p-8">
      <div className="max-w-2xl text-center space-y-8 py-16">
        <div className="w-48 mx-auto">
          <video autoPlay loop muted playsInline className="w-full h-auto">
            <source src="/ff-logo.mp4" type="video/mp4" />
          </video>
        </div>
        <h1 className="text-xl md:text-2xl font-medium tracking-tighter">THE END OF THE WORLD</h1>
        <div className="text-base text-left space-y-6 leading-relaxed border-t border-b border-border py-8" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
          <p>
            One day, without warning or explanation, people were gone. Not
            all of them. But enough. No catastrophe, no war, no pandemic — just a quiet and
            sudden absence, as if the world blinked and most of its occupants forgot to reappear.
          </p>
          <p>
            What remained was everything else. The cities kept standing. The oceans kept
            rising. The factories held their chemicals and the parking lots held their cars.
            Infrastructure ground slowly to a halt, not in crisis but in something closer to
            resignation — systems completing their last cycles, then going still.
          </p>
          <p>
            And then the earth did what it does. Moss filled the crosswalks. Salt climbed the
            buildings. The steam that once heated apartments escaped through the grates
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
            pulse points. A thought experiment that lives on your wrist.
          </p>
        </div>
        <Link
          to="/#collection"
          className="inline-block px-8 py-3 border border-graphite text-graphite font-mono text-xs uppercase tracking-widest hover:bg-graphite hover:text-white transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    </div>
  )
}
