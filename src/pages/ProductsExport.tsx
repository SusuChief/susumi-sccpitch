import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import susuFundImg from "@/assets/susu-fund.png";
import susuTokensImg from "@/assets/susu-tokens.png";
import susuNftsImg from "@/assets/susu-nfts.png";
import validatorPanelImg from "@/assets/validator-panel.png";

const productImages = [
  { name: "susu-fund.png", url: susuFundImg },
  { name: "susu-tokens.png", url: susuTokensImg },
  { name: "susu-nfts.png", url: susuNftsImg },
  { name: "validator-panel.png", url: validatorPanelImg }
];

const componentCode = `import { useEffect, useRef } from "react";
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
};`;

const cssStyles = `.gradient-text {
  @apply bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent;
}

.hover-glow {
  @apply transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:border-primary/50;
}

.section-anchor {
  @apply scroll-mt-20;
}`;

const ProductsExport = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Products Section Export</h1>
          <p className="text-muted-foreground">
            Copy the component code, styles, and download product images to replicate this section
          </p>
        </div>

        {/* Component Code */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products Component Code</h2>
            <Button
              onClick={() => copyToClipboard(componentCode, "component")}
              variant="outline"
            >
              {copied === "component" ? "Copied!" : "Copy Code"}
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{componentCode}</code>
          </pre>
        </Card>

        {/* CSS Styles */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Required CSS Styles</h2>
            <Button
              onClick={() => copyToClipboard(cssStyles, "css")}
              variant="outline"
            >
              {copied === "css" ? "Copied!" : "Copy Styles"}
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{cssStyles}</code>
          </pre>
        </Card>

        {/* Product Images */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Product Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productImages.map((image) => (
              <div key={image.name} className="space-y-2">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full aspect-square object-contain bg-muted rounded-lg p-4"
                />
                <p className="text-sm font-medium text-center">{image.name}</p>
                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = image.url;
                    link.download = image.name;
                    link.click();
                  }}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Dependencies */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Required Dependencies</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# or with yarn
yarn add @radix-ui/react-slot class-variance-authority clsx tailwind-merge`}</code>
          </pre>
        </Card>

        {/* Usage Instructions */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Usage Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Download all product images and place them in your <code className="bg-muted px-2 py-1 rounded">src/assets/</code> folder</li>
            <li>Copy the component code into a new file: <code className="bg-muted px-2 py-1 rounded">src/components/sections/Products.tsx</code></li>
            <li>Add the CSS styles to your <code className="bg-muted px-2 py-1 rounded">src/index.css</code> file</li>
            <li>Ensure you have the Card component from shadcn/ui installed</li>
            <li>Import and use the Products component with the onView callback prop</li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default ProductsExport;
