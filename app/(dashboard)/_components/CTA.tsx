import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way</div>
      <h2 className="text-3xl font-bold">
        Build your personalized learning Buddy
      </h2>
      <p>
        Pick a name, subject, voice & personality - and start learning through
        voice conversations that feel like chatting with a friend.
        <br />
        <br />
        <strong>Ready to get started?</strong>
      </p>
      <Image src={"images/cta.svg"} alt="CTA" width={362} height={232} />
      <button className="btn-primary">
        <Image src={"/icons/plus.svg"} alt="CTA" width={12} height={12} />
        <Link href={"/buddys/new"}>
          <p>Build a New Buddy</p>
        </Link>
      </button>
    </section>
  );
};

export default CTA;
