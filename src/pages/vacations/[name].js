import React from 'react';
import { useRouter } from 'next/router';
import { Button, Typography } from '@mui/material';
import { vacationData } from '@/assets/data/VacationData';
import Image from 'next/image';

import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import LoadingImage from '@/components/common/LoadingImage';

const Card = ({
  icon,
  title,
  description,
  link,
  imgPath = '',
  cardColor = 'white',
  textColor = 'black',
}) => {
  const content = () => (
    <>
      {imgPath && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'middle',
          }}
        >
          <LoadingImage
            alt={'Image'}
            width={250}
            height={200}
            src={imgPath}
            style={{
              objectFit: 'contain',
              width: 250,
              height: 200,
            }}
          />
        </div>
      )}
      {icon && <div style={{ margin: 50 }}>{icon}</div>}
      <CardContent style={{ flex: 1 }}>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          style={{ color: textColor }}
        >
          {title}
        </Typography>
        <Typography variant="body2" style={{ color: textColor }}>
          {description}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <MUICard
      sx={{
        maxWidth: 250,
        height: 300,
        margin: 2,
        borderRadius: 10,
        border: '1px solid black',
      }}
      style={{
        backgroundColor: cardColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow:
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      }}
    >
      {link ? (
        <Link
          href={link}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {content()}
        </Link>
      ) : (
        content()
      )}
    </MUICard>
  );
};

const VacationName = () => {
  const router = useRouter();
  const { name } = router.query;
  const vacation = vacationData?.[name];

  return (
    <div>
      <div
        style={{
          backgroundColor: 'lime',
          padding: 10,
          borderBottom: '2px solid black',
        }}
      >
        <Button
          variant="contained"
          className="bg-blue-500"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <div
        style={{
          border: '30px solid',
          borderImage: `url("${vacation?.borderImage}")`,
          backgroundColor: 'lightgreen',
        }}
      >
        <div id="top-section" style={{ marginBlock: 10, marginInline: 40 }}>
          <Typography
            variant="h2"
            style={{ color: 'black', marginBottom: 20 }}
            align="center"
          >
            {vacation?.title}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              alt={'Image'}
              width={250}
              height={200}
              src={vacation?.imgPath || ''}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
          <Typography
            variant="h5"
            align="center"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {vacation?.description}
          </Typography>
        </div>
        <div
          id="card-section"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {vacation?.cards?.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
        <div id="footer-section">
          <Typography
            align="center"
            style={{ color: 'black', fontWeight: 'bold', fontSize: 'xx-large' }}
          >
            {vacation?.footer}
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {vacation?.otherImages?.map((imgPath, index) =>
            imgPath ? (
              <LoadingImage
                key={index}
                alt={'Image'}
                width={250}
                height={250}
                src={imgPath}
                style={{
                  objectFit: 'contain',
                }}
              />
            ) : (
              ''
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default VacationName;
