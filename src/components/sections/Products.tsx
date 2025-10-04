import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Wallet, Coins, Image, Lock } from "lucide-react";
import susumiPlusLogo from "@/assets/susumi-plus-logo.png";

const products = [
  {
    icon: Wallet,
    title: "Susu Funds",
    description: "A blockchain version of Esusu. Enables anybody to raise money quickly using crypto. Individuals, enterprises, and communities can all participate. All participants benefit: 'You Give, You Get, Plus More.'"
  },
  {
    icon: Coins,
    title: "SUSU+ Tokens",
    logo: true,
    description: "Unique token with limited circulation. Max supply: 100 Billion units. Less than 1% in circulation, 4% time-locked, 95% unminted. New tokens minted only after donations received. Used for investment and revenue-generating NFTs."
  },
  {
    icon: Image,
    title: "Susumi NFTs",
    description: "Various NFT series representing roles and ownership in the Susumi ecosystem. Enable viral social investments and platform growth. Unique revenue-generating tokens tradeable on secondary markets."
  },
  {
    icon: Lock,
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
              {product.logo ? (
                <img 
                  src={susumiPlusLogo} 
                  alt="SUSU+" 
                  className="h-16 w-16 mb-4"
                />
              ) : (
                <product.icon className="h-16 w-16 text-primary mb-4" />
              )}
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
