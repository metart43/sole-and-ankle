import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const STYLES = {
  "on-sale": {
    backgroundColor: COLORS.primary,
    label: "Sale"
  },
  "new-release": {
    backgroundColor: COLORS.secondary,
    label: "Just Released!"
  }
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
      
  const styles = STYLES[variant];
  const onSale = typeof salePrice === 'number';

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {styles ?
          <ShoeTag style={{ "--backgroundColor": styles.backgroundColor }}>{styles.label}</ShoeTag>
          : null}
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            "--textDecoration":  onSale ? "line-through" : "none",
            "--textColor": onSale ? COLORS.gray[700] : COLORS.black
          }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{formatPrice(salePrice)}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const ShoeTag = styled.span`
  height: 32px;
  padding: 8px;
  color: ${COLORS.white};
  position: absolute;
  top: 16px;
  right: -4px;
  z-index: 1;
  background-color: var(--backgroundColor);
  border-radius: 2px;
  display: flex;
  align-items: center;
`;


const Link = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex: 1 0 310px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  margin-left: auto;
  text-decoration: var(--textDecoration);
  color: var(--textColor);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-left: auto;
`;

export default ShoeCard;
