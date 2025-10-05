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
    description: "A blockchain version of Esusu (Rotating Savings and Credit Associations). Enables anybody to raise money quickly without collateral or a credit check. Individuals, enterprises, and communities can all participate. All participants benefit."
  },
  {
    image: susuTokensImg,
    title: "SUSU+ Token",
    description: "Unique ERC 20 token with limited circulation. Max supply: 100 Billion units. Less than 1% in circulation, 4% time-locked, 95% unminted. New tokens can only be minted after donations have been received and a Susu Fund has successfully matured. No donations, no tokens."
  },
  {
    image: susuNftsImg,
    title: "Susumi NFTs",
    description: "Various NFT series representing roles and ownership within the Susumi ecosystem. Susumi NFTs are dynamic and enable peer-regulation and viral platform growth. The Unique revenue-generating tokens are tradeable on secondary markets."
  },
  {
    image: validatorPanelImg,
    title: "The Validator Panel",
    description: "Secure vault for time-locked SUSU+ tokens. 40% of USDT platform revenue distributed to locked tokens every 30 days. Increases token value and encourages wider adoption."
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
          A comprehensive ecosystem of blockchain-powered financial products
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
