import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, X, Utensils, Shuffle } from 'lucide-react';
import { Menu } from '../App';

interface MenuSelectorProps {
  selectedMenus: string[];
  onMenusChange: (menus: string[]) => void;
  availableMenus?: Menu[];
  maxMenus?: number;
  minMenus?: number;
  placeholder?: string;
  title?: string;
  description?: string;
}

export function MenuSelector({
  selectedMenus,
  onMenusChange,
  availableMenus = [],
  maxMenus = 8,
  minMenus = 2,
  placeholder = "메뉴 이름을 입력하세요",
  title = "메뉴 선택",
  description = "원하는 메뉴들을 추가해보세요"
}: MenuSelectorProps) {
  const [newMenu, setNewMenu] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddMenu = (menuName: string) => {
    const trimmedMenu = menuName.trim();
    if (trimmedMenu && !selectedMenus.includes(trimmedMenu) && selectedMenus.length < maxMenus) {
      onMenusChange([...selectedMenus, trimmedMenu]);
      setNewMenu('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveMenu = (menuToRemove: string) => {
    onMenusChange(selectedMenus.filter(menu => menu !== menuToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddMenu(newMenu);
    }
  };

  const addRandomMenus = () => {
    const availableToAdd = availableMenus
      .map(menu => menu.name)
      .filter(name => !selectedMenus.includes(name));
    
    if (availableToAdd.length === 0) return;

    const shuffled = availableToAdd.sort(() => 0.5 - Math.random());
    const toAdd = shuffled.slice(0, Math.min(3, maxMenus - selectedMenus.length));
    
    onMenusChange([...selectedMenus, ...toAdd]);
  };

  const filteredSuggestions = availableMenus
    .filter(menu => 
      menu.name.toLowerCase().includes(newMenu.toLowerCase()) &&
      !selectedMenus.includes(menu.name)
    )
    .slice(0, 5);

  return (
    <Card className="border-0 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* 헤더 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {minMenus}개 이상 {maxMenus}개 이하 ({selectedMenus.length}/{maxMenus})
            </p>
          </div>

          {/* 메뉴 입력 */}
          <div className="space-y-3">
            <div className="relative">
              <Input
                value={newMenu}
                onChange={(e) => {
                  setNewMenu(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowSuggestions(newMenu.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={placeholder}
                className="h-12 pr-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={selectedMenus.length >= maxMenus}
              />
              <Button
                type="button"
                onClick={() => handleAddMenu(newMenu)}
                disabled={!newMenu.trim() || selectedMenus.length >= maxMenus}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg active:scale-90 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* 추천 메뉴 */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 space-y-1">
                {filteredSuggestions.map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => handleAddMenu(menu.name)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-sm text-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <span>{menu.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {menu.category}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 랜덤 추가 버튼 */}
          {availableMenus.length > 0 && selectedMenus.length < maxMenus && (
            <Button
              variant="outline"
              onClick={addRandomMenus}
              className="w-full h-11 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 active:bg-blue-100 rounded-xl transition-all duration-200 active:scale-98"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              랜덤 메뉴 추가
            </Button>
          )}

          {/* 선택된 메뉴들 */}
          {selectedMenus.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">선택된 메뉴</span>
                <span className="text-xs text-gray-500">{selectedMenus.length}개</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedMenus.map((menu, index) => (
                  <div
                    key={menu}
                    className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm group hover:bg-blue-100 transition-colors duration-200"
                  >
                    <span>{menu}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMenu(menu)}
                      className="w-4 h-4 p-0 text-blue-600 hover:text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 상태 메시지 */}
          {selectedMenus.length < minMenus && (
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <p className="text-sm text-yellow-700">
                최소 {minMenus}개의 메뉴를 선택해주세요. 
                <span className="text-yellow-800">({minMenus - selectedMenus.length}개 더 필요)</span>
              </p>
            </div>
          )}

          {selectedMenus.length >= maxMenus && (
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                최대 {maxMenus}개까지만 선택할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}