import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import susuFundImg from "@/assets/susu-fund.png";
import susuTokensImg from "@/assets/susu-tokens.png";
import susuNftsImg from "@/assets/susu-nfts.png";
import validatorPanelImg from "@/assets/validator-panel.png";

const products = [
  {
    image: susuFundImg,
    title: "Susu Funds",
    description: "Anyone can raise money quickly, without collateral or a credit check. Individuals, enterprises and communities can all take part, and every participant benefits."
  },
  {
    image: susuTokensImg,
    title: "SUSU+ Token",
    description: "A NEAR Protocol token (NEP-141) with a 100 billion maximum supply: under 1% circulating, 4% time-locked, 95% unminted. New tokens are minted only when a fund matures."
  },
  {
    image: susuNftsImg,
    title: "Susumi NFTs",
    description: "NFT series that represent roles and ownership in the ecosystem. They support peer regulation and platform growth, and can be traded on secondary markets."
  },
  {
    image: validatorPanelImg,
    title: "Validator Panel",
    description: "A vault for time-locked SUSU+. 40% of platform fee revenue is distributed to locked tokens every 30 days, rewarding Validators who review funds."
  }
];

interface ProductsProps {
  onView: () => void;
}

export const Products = ({ onView }: ProductsProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Key <span className="gradient-text">Products</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Four connected products. The Basic Susu Fund is the first to launch; the others follow on the same contracts.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <Card 
              key={index}
              className="p-8 bg-card hover-glow"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-24 h-24 object-contain mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-semibold mb-3">{product.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
