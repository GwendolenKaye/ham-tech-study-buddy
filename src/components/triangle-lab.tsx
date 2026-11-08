export function TriangleLab() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">Cover one letter</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">Two triangles cover the math.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Put a finger over the letter you do not know. If the other two sit side by side, multiply them. If
          one is above the other, divide the top by the bottom.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[
            ["E", "voltage, volts"],
            ["I", "current, amperes"],
            ["R", "resistance, ohms"],
            ["P", "power, watts"],
          ].map(([letter, meaning]) => (
            <li key={letter} className="rounded-xl border border-line bg-bg px-3 py-2">
              <span className="font-mono text-lg text-primary">{letter}</span>
              <span className="mt-0.5 block text-muted">{meaning}</span>
            </li>
          ))}
        </ul>
      </section>

      <figure className="overflow-hidden rounded-2xl border border-line bg-bg">
        <img
          src="/ohm-triangle.jpg"
          alt="Ohm’s law triangle. E on top, I and R below. Formulas: E equals I times R, I equals E divided by R, R equals E divided by I."
          className="w-full"
        />
      </figure>

      <figure className="overflow-hidden rounded-2xl border border-line bg-bg">
        <img
          src="/power-triangle.jpg"
          alt="Power triangle. P on top, E and I below. Formulas: P equals E times I, E equals P divided by I, I equals P divided by E."
          className="w-full"
        />
      </figure>
    </div>
  );
}
