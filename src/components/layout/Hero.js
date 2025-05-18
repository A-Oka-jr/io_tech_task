export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <div
        className="h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('/slider1.jpg')" }}
      >
        <div
          className="absolute inset-0 bg-[#4B2615]/40 z-10"
          style={{ pointerEvents: "none" }}
        />
      </div>
    </div>
  );
}
