import { useState, useEffect } from 'react';
import { hasRichEditorData, getRichEditorPostsCount, loadPostsFromLocalStorage } from '@/data/adapters/localStorageAdapter';
import { Button } from '@ui8kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui8kit/ui/card';

export function RichEditorStatus() {
  const [hasData, setHasData] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const checkStatus = () => {
    setHasData(hasRichEditorData());
    setPostsCount(getRichEditorPostsCount());
    setLastUpdate(new Date());
  };

  useEffect(() => {
    checkStatus();
    
    // Check every 2 seconds for changes
    const interval = setInterval(checkStatus, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    checkStatus();
    // Force reload of the page to refresh data
    window.location.reload();
  };

  const handleClearData = () => {
    localStorage.removeItem('rich-editor-context');
    checkStatus();
    window.location.reload();
  };

  const handleViewData = () => {
    const posts = loadPostsFromLocalStorage();
    console.log('Rich Editor Posts:', posts);
    alert('Posts data logged to console. Check browser dev tools.');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Rich Editor Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            hasData 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
          }`}>
            {hasData ? 'Connected' : 'No Data'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Posts:</span>
          <span className="font-medium">{postsCount}</span>
        </div>
        
        {lastUpdate && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Check:</span>
            <span className="text-xs text-muted-foreground">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button onClick={handleRefresh} size="sm" variant="outline">
            Refresh
          </Button>
          <Button onClick={handleViewData} size="sm" variant="outline" disabled={!hasData}>
            View Data
          </Button>
          <Button onClick={handleClearData} size="sm" variant="destructive" disabled={!hasData}>
            Clear
          </Button>
        </div>
        
        {!hasData && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Open Rich Editor and create some posts to see them here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 