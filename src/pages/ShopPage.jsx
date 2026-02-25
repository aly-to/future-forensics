import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function ShopPage() {
  return (
    <div className="h-full overflow-y-auto bg-bone">
      <div className="p-8 md:p-12 pb-4">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tighter mb-4">FULL ARCHIVE</h1>
        <p className="font-mono text-sm text-gray-500 max-w-xl">
          All available speculative reconstructions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
        {products.map(p => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="group border-b border-r border-border relative bg-bone hover:bg-white transition-colors block"
          >
            <div className="aspect-square p-8 flex items-center justify-center relative overflow-hidden">
              {/* Default: small color swatch centered */}
              {p.swatch ? (
                <img src={p.swatch} alt={p.name} className="w-32 h-32 object-cover relative z-10 group-hover:opacity-0 transition-opacity duration-500" />
              ) : (
                <div className="w-32 h-32 relative z-10 group-hover:opacity-0 transition-opacity duration-500" style={{ backgroundColor: p.color }} />
              )}
              {/* Hover: full swatch background + bottle overlay */}
              {p.swatch && (
                <img src={p.swatch} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              {p.swatch && (
                <img
                  src="/bottle.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain p-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-lg"
                />
              )}
              <div className="absolute top-4 right-4 font-mono text-xs text-gray-400 z-20">{p.id}</div>
            </div>
            <div className="p-6 border-t border-border flex justify-between items-end">
              <div>
                <h3 className="text-xl font-medium tracking-tight mb-1">{p.name}</h3>
                <p className="font-mono text-xs text-gray-500 uppercase">{p.tagline}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono underline group-hover:no-underline">
                  VIEW
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="p-12 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-bold tracking-tight text-lg mb-4">FUTURE FORENSICS</h4>
          <p className="font-mono text-xs text-gray-500 max-w-xs">
            Olfactory field notes from the quiet earth. Eight atmospheric reconstructions
            from a world that continued without us.
          </p>
        </div>
        <div>
          <h5 className="font-mono text-xs text-gray-500 mb-4 uppercase">Support</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Shipping &amp; Returns</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Contact Lab</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-xs text-gray-500 mb-4 uppercase">Social</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
