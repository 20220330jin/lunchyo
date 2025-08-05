import { Menu } from '@/shared/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface MenuCardProps {
  menu: Menu;
}

/**
 * 단일 메뉴항목 컴포넌트
 *
 * @description
 * Menu 타입 데이터를 Card형식으로 구현
 *
 * @author hjkim
 * @constructor
 */
export const MenuCard = ({ menu }: MenuCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{menu.menuName}</CardTitle>
        <CardDescription>{menu.menuCategory}</CardDescription>
      </CardHeader>
      <CardContent>
        {menu.menuDescription && <p className="text-sm text-gray-600">{menu.menuDescription}</p>}
        {menu.menuImageUrl && <img src={menu.menuImageUrl} alt="menu image" className="mt-2 rounded-md" />}
      </CardContent>
    </Card>
  );
};
