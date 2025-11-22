import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, File, Folder } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminCodeEditor = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState('index.tsx');

  const fileTree = [
    { name: 'src', type: 'folder', children: [
      { name: 'components', type: 'folder' },
      { name: 'pages', type: 'folder' },
      { name: 'App.tsx', type: 'file' },
      { name: 'index.tsx', type: 'file' },
    ]},
    { name: 'public', type: 'folder' },
    { name: 'package.json', type: 'file' },
  ];

  const sampleCode = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your project will be downloaded as a ZIP file.',
    });
  };

  const FileTreeItem = ({ item, level = 0 }: any) => (
    <div style={{ paddingLeft: `${level * 1}rem` }}>
      <div 
        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-muted ${
          selectedFile === item.name ? 'bg-muted' : ''
        }`}
        onClick={() => item.type === 'file' && setSelectedFile(item.name)}
      >
        {item.type === 'folder' ? (
          <Folder className="h-4 w-4 text-primary" />
        ) : (
          <File className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {item.children && item.children.map((child: any) => (
        <FileTreeItem key={child.name} item={child} level={level + 1} />
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Code Editor</h1>
            <p className="text-muted-foreground">
              View and manage project files
            </p>
          </div>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export as ZIP
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-16rem)]">
          {/* File Tree */}
          <Card className="p-4 overflow-y-auto">
            <h3 className="font-semibold mb-3 text-sm">Project Files</h3>
            <div className="space-y-1">
              {fileTree.map((item) => (
                <FileTreeItem key={item.name} item={item} />
              ))}
            </div>
          </Card>

          {/* Code Editor */}
          <Card className="lg:col-span-3 overflow-hidden flex flex-col">
            <div className="border-b border-border p-3 bg-muted/30">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span className="font-mono text-sm">{selectedFile}</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className="font-mono text-sm">
                <code>{sampleCode}</code>
              </pre>
            </div>
          </Card>
        </div>

        <Card className="p-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is a read-only code viewer. Direct editing is not available in this interface.
            Use the export function to download the project and edit locally.
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCodeEditor;
