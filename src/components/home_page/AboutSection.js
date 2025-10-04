import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import { aboutSectionData } from '@/assets/data/AboutSectionData';
import { FadeInUpAnimation } from '../utils/Animations';
import LoadingImage from '../common/LoadingImage';

const mobileDevice = isMobile || false;

const AboutSection = ({ alternating = true, viewWidth = 800 }) => {
  return (
    <div style={styles.wordSectionWrapper} id={'info-section'}>
      {aboutSectionData?.map((item, index) =>
        getSection({ ...item, index, alternating, viewWidth }),
      )}
    </div>
  );
};

export default AboutSection;

const getSection = ({
  imagePath,
  title,
  description,
  index,
  alternating = false,
  viewWidth,
}) => {
  const width = Math.min(viewWidth, 400);

  const imageBorderRadius = 100;
  const isSmallScreen = mobileDevice || viewWidth < 800;
  const myStyle = !isSmallScreen
    ? styles.wordSection
    : styles.wordSectionSmallScreen;

  const getWordSection = (title, descriptions) => {
    const middle = Math.ceil(descriptions?.length / 2);
    return (
      <div style={myStyle} id={index}>
        <div style={styles.titleWrapper}>
          <Typography
            variant={'h4'}
            sx={{ fontWeight: 'bold' }}
            align={'center'}
          >
            {title}
          </Typography>
        </div>
        <div>
          {descriptions[0]?.includes('Title:') ? (
            <>
              <Typography
                key={index}
                style={{
                  textAlign: 'middle',
                  margin: 'auto',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                }}
              >
                {descriptions[0].split('Title:')}:
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <ul key={`left-side-${title}-1`} id={`left-side-${title}`}>
                  {descriptions?.slice(1, middle)?.map((item, i) => (
                    <li key={`left-${i}`} id={`left-${i}`}>
                      {item}
                    </li>
                  ))}
                </ul>
                <ul key={`right-side-${title}-2`} id={`right-side-${title}`}>
                  {descriptions
                    ?.slice(middle, descriptions?.length)
                    ?.map((item, i) => (
                      <li key={`right-${i}`} id={`right-${i}`}>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          ) : (
            description?.map((item, index) => (
              <Typography key={index} style={{ marginTop: 10 }}>
                {item}
              </Typography>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <FadeInUpAnimation index={index} key={index}>
      <div style={styles.wordImageWrapper}>
        {!isSmallScreen && alternating ? (
          index % 2 === 0 ? (
            <>
              {getWordSection(title, description)}
              <div style={styles.centerItems}>
                <LoadingImage
                  alt={'Image'}
                  width={width}
                  height={width}
                  src={imagePath}
                  style={{
                    objectFit: 'cover',
                    borderRadius: imageBorderRadius,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div style={styles.centerItems}>
                <LoadingImage
                  alt={'Image'}
                  width={width}
                  height={width}
                  src={imagePath}
                  style={{
                    objectFit: 'cover',
                    borderRadius: imageBorderRadius,
                  }}
                />
              </div>
              {getWordSection(title, description)}
            </>
          )
        ) : (
          <>
            <div style={styles.centerItems}>
              <LoadingImage
                alt={'Image'}
                width={width}
                height={width}
                src={imagePath}
                style={{
                  objectFit: 'cover',
                  borderRadius: imageBorderRadius,
                }}
              />
            </div>
            {getWordSection(title, description)}
          </>
        )}
      </div>
    </FadeInUpAnimation>
  );
};

const styles = {
  wordImageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 20,
  },
  wordSectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  wordSection: {
    width: '50%',
    minWidth: '600px',
    textAlign: 'left',
    marginLeft: 20,
    padding: '0px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wordSectionSmallScreen: {
    width: '90%',
    minWidth: '100%',
    textAlign: 'left',
    marginLeft: 0,
    padding: '0px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: mobileDevice ? '40px 0px' : '0px 0px 40px 0px',
  },
  centerItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};
