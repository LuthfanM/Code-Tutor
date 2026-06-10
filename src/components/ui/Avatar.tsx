export function Avatar({ name, src }: { name?: string | null; src?: string | null }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name ?? "User avatar"}
        className="h-9 w-9 rounded-full border border-line object-cover"
      />
    );
  }

  return (
    <div className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-sm font-semibold text-ink">
      {(name ?? "U").charAt(0).toUpperCase()}
    </div>
  );
}
