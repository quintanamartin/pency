import React from "react";
import {Box, Text, Flex, useDisclosure, FlexProps, Stack} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product, Variant} from "~/product/types";
import CartItemDrawer from "~/cart/components/CartItemDrawer";

interface Props extends FlexProps {
  product: Product;
  add: (product: Product, variants: Variant[], count: number) => void;
  isRaised?: boolean;
}

const ProductCard: React.FC<Props> = ({isRaised = false, product, add, ...props}) => {
  const {image, title, price} = product;
  const {isOpen: isOptionsOpen, onToggle: toggleOptions} = useDisclosure();

  function handleAdd(product: Product, variants: Variant[], count: number) {
    toggleOptions();

    return add(product, variants, count);
  }

  return (
    <>
      <Flex
        alignItems="flex-end"
        boxShadow={isRaised ? "lg" : "none"}
        cursor="pointer"
        data-test-id="product"
        direction="column"
        justifyContent="space-between"
        position="relative"
        rounded="md"
        transition="transform 0.2s"
        onClick={toggleOptions}
        {...props}
      >
        <Image
          cursor={image ? "pointer" : "inherit"}
          height={{base: 48, sm: 56}}
          rounded="md"
          src={image || "/assets/fallback.jpg"}
          width="100%"
        />
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
          padding={isRaised ? {base: 2, sm: 4} : 0}
          paddingTop={2}
          width="100%"
        >
          <Stack marginBottom={2} spacing={{base: 1, sm: 2}}>
            <Text
              display="block"
              fontSize={{base: "md", sm: "md"}}
              fontWeight={500}
              lineHeight="normal"
            >
              {title}
            </Text>
          </Stack>
          <Flex alignItems="center">
            <Text
              color="green.500"
              flex={1}
              fontSize={{base: "sm", sm: "md"}}
              fontWeight={500}
              lineHeight={1}
            >
              ${price}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <CartItemDrawer
        isOpen={isOptionsOpen}
        product={product}
        onClose={toggleOptions}
        onSubmit={handleAdd}
      />
    </>
  );
};

export default ProductCard;
