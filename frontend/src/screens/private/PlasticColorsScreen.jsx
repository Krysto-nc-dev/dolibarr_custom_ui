import React from 'react';
import { useGetPlasticColorsQuery } from '../../slices/plasticColorSlice';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const PlasticColorsScreen = () => {
  const { data: plasticColors, error, isLoading } = useGetPlasticColorsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Couleurs de plastique
      </Typography>
      <Grid container spacing={4}>
        {plasticColors.map((color) => (
          <Grid item key={color._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={color.name}
                height="140"
                image={color.iconUrl}
                title={color.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {color.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {color.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PlasticColorsScreen;
