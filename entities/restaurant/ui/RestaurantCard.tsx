import { Restaurant } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

/**
 * 단일 식당을 보여주는 컴포넌트
 *
 * @description
 * Restaurant 타입의 데이터를 Card형식으로 표현
 *
 * @author hjkim
 * @constructor
 */
export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{restaurant.restaurantName}</CardTitle>
      </CardHeader>
      <CardContent>
        {restaurant.restaurantAddress && <p>주소: {restaurant.restaurantAddress}</p>}
        {restaurant.restaurantPhone && <p>전화: {restaurant.restaurantPhone}</p>}
        {restaurant.restaurantRating && <p>평점: {restaurant.restaurantRating}</p>}
        {restaurant.restaurantMenuItems && restaurant.restaurantMenuItems.length > 0 && (
          <div>
            <h4>메뉴: </h4>
            <ul>
              {restaurant.restaurantMenuItems.map((menuItem) => (
                <li key={menuItem.menuId}>{menuItem.menuName}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
