import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Lock, AlertCircle, User } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (nickname?: string) => void;
  title: string;
  description: string;
  requireNickname?: boolean;
}

export function PasswordModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  title, 
  description, 
  requireNickname = false 
}: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    if (requireNickname && !nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Mock password validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 간단한 비밀번호 검증 (실제로는 서버에서)
    if (password === '1234' || password === 'test') {
      onSuccess(requireNickname ? nickname : undefined);
      handleClose();
    } else {
      setError('잘못된 비밀번호입니다. 다시 시도해주세요.');
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword('');
    setNickname('');
    setError('');
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl border-0 shadow-xl">
        <DialogHeader className="text-center space-y-4 pt-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <DialogTitle className="text-xl text-gray-900">{title}</DialogTitle>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
          {requireNickname && (
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm text-gray-700">
                닉네임
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="nickname"
                  type="text"
                  placeholder="사용할 닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  maxLength={10}
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500">최대 10자까지 입력 가능합니다.</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-700">
              비밀번호
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="text"
                placeholder="방 비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-700 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-12 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-98 transition-all duration-200"
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 active:scale-98"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                '입장하기'
              )}
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              💡 테스트용 비밀번호: <span className="text-blue-600">1234</span> 또는 <span className="text-blue-600">test</span>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}