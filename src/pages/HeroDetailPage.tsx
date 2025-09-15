import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import apiClient from "@/api-client/api-client"; // твій axios інстанс
import type { Hero, HeroImage } from "@/types";

import DeleteDialog from "@/components/DeleteDialog";
import { useHeroes } from "@/hooks/useHeroes";

export default function HeroDetailsPage() {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { deleteHero } = useHeroes();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const heroRes = await apiClient.get<Hero>(`/api/superheroes/${id}`);
        const imagesRes = await apiClient.get<HeroImage[]>(`/api/images/${id}`);
        setHero(heroRes.data);
        setImages(imagesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [id]);
  const handleDeleteHero = () => {
    deleteHero(id!);
  };
  if (loading) return <p>Loading...</p>;
  if (!hero) return <p>Hero not found</p>;

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{hero.nickname}</h1>
          <div className="flex gap-4">
            <DeleteDialog onSumbit={handleDeleteHero} />
            <Link to={`/superheroes/${id}/edit`}>
              <Button size="sm">Edit</Button>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground">Real name: {hero.real_name}</p>

        {images[0] && (
          <img
            src={images[0].image_url}
            alt={hero.nickname}
            className="w-full max-h-100 object-cover rounded-lg shadow"
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle>Origin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{hero.origin_description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Superpowers</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {hero.superpowers.map((power, idx) => (
              <Badge key={idx} variant="secondary">
                {power}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Catch Phrase</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="italic text-base">
              "{hero.catch_phrase}"
            </blockquote>
          </CardContent>
        </Card>

        {images.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {images.map((img) => (
                <div key={img.id} className="space-y-1">
                  <img
                    src={img.image_url}
                    alt={img.caption || "Hero image"}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  {img.caption && (
                    <p className="text-xs text-center text-muted-foreground">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
